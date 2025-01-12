// x, y, z, rotation
// N:Math.PI   E:(3(Math.PI)/2)   S:0   W:(Math.PI/2)
// please, github, update scene.js
const directionKey = {
  "N": Math.PI,
  "E": (3 * Math.PI) / 2,
  "S": 0,
  "W": Math.PI / 2
};
const picLocations = [
  [-3, -27, 38, "E"],
  [-3, -25, 36, "E"],
  [3, 4, -38, "W"],
  [3, 4, -33, "W"],
  [-12, 4, -29, "S"],
  [-4, 4, -30, "S"],
  [17, 4, -27, "N"],
  [28, 4, -18, "S"],
  [35, 4, -27, "N"],
  [56, 4, -8, "W"],
  [57, 4, -35, "W"],
  [45, 4, -38, "N"],
  [55, 4, 3, "W"],
  [55, 4, 14, "W"],
  [55, 4, 22, "W"],
  [55, 4, 38, "W"],
  [17, 4, -29, "S"],
  [22, 4, -36, "W"],
  [36, 4, -29, "S"],
  [40, 4, -35, "W"],
  [-1, 4, 1, "E"],
  [-1, 4, 16, "E"],
  [-1, 4, 25, "E"],
  [-1, 4, 35, "E"]
];

const walkSpeed = 1;
const sprintSpeed = 2;
const superSprintSpeed = 10;

function animateFOV(camera, start, end, duration) {
  let startTime = performance.now();
  function updateFOV(currentTime) {
    let elapsedTime = currentTime - startTime;
    if (elapsedTime >= duration) {
      camera.fov = end;
      return;
    }
    let t = elapsedTime / duration;
    let fov = start + (end - start) * t;
    camera.fov = fov;
    requestAnimationFrame(updateFOV);
  }
  requestAnimationFrame(updateFOV);
}

let createGameScene = function(canvas, engine) {
  const scene = new BABYLON.Scene(engine);
  const earthGravity = -9.81;
  scene.gravity = new BABYLON.Vector3(0, earthGravity / 60, 0); // 60 is (assumed) fps
  scene.enablePhysics(scene.gravity, new BABYLON.CannonJSPlugin());
  scene.clearColor = new BABYLON.Color3(0, .3, .5);
  const camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(-10, 7, -38), scene);

  camera.attachControl(canvas, true);
  camera.keysUp.push(87);
  camera.keysDown.push(83);
  camera.keysLeft.push(65);
  camera.keysRight.push(68);
  camera.speed = walkSpeed;
  camera.fov = 0.8;
  camera.inertia = .01;
  camera.angularSensibility = 1400;
  camera.ellipsoid = new BABYLON.Vector3(.5, .5, .5);
  camera.minZ = .35;
  camera.checkCollisions = true;
  camera.applyGravity = true;
  camera.collisionsEnabled = true;
  camera._needMoveForGravity = true;
  camera.useBouncingBehavior = false;
  
  let light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(20,  -20, -20), scene);

  // THE IMAGES
  let easingFunction = new BABYLON.SineEase();
  easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
  var increaseAnimation = new BABYLON.Animation("increaseAnimation", "scaling", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
  var decreaseAnimation = new BABYLON.Animation("decreaseAnimation", "scaling", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
  let keysIncrease = [];
  let keysDecrease = [];
  keysIncrease.push({frame: 0, value: new BABYLON.Vector3(1, 1, 1)});
  keysIncrease.push({frame: 5, value: new BABYLON.Vector3(1.5, 1.5, 1.5)});
  keysDecrease.push({frame: 0, value: new BABYLON.Vector3(1.5, 1.5, 1.5)});
  keysDecrease.push({frame: 5, value: new BABYLON.Vector3(1, 1, 1)});
  increaseAnimation.setKeys(keysIncrease);
  decreaseAnimation.setKeys(keysDecrease);

  let images = [];

  for (let i=1; i<36; i++) {
    images.push("./Assets/DP/AbstractAlphabet/AbstractAlphabet-" + i + ".jpg");
    if (i<23) {
      images.push("./Assets/DP/Repetition/Repetition-" + i + ".jpg");
      if (i<16) {
        images.push("./Assets/DP/ApeturePriority/ApeturePriority-" + i + ".jpg");
      }  
    }
  }

  for (let [key, value] of Object.entries(picLocations)) {
    let display = BABYLON.MeshBuilder.CreateBox("wall", {
      width: 3,
      height: 2,
      depth: .1
    }, scene);

    display.position.x = value[0];
    display.position.y = value[1];
    display.position.z = value[2];
    display.rotation = new BABYLON.Vector3(0, directionKey[value[3]], 0);

    let displayImage = new BABYLON.StandardMaterial("material", scene);
    displayImage.diffuseTexture = new BABYLON.Texture(images[(Math.floor(Math.random() * images.length))], scene);
    display.material = displayImage;
    display.material.emissiveColor = BABYLON.Color3.White();

    display.actionManager = new BABYLON.ActionManager(scene);
    display.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, function() { 
      display.animations = [increaseAnimation];
      scene.beginAnimation(display, 0, 5, false);
    }));
    display.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger, function() {
      display.animations = [decreaseAnimation];
      scene.beginAnimation(display, 0, 5, false);
    }));
  }

  ////   THE CUBE   ////
  var glass = new BABYLON.PBRMaterial("glass", scene);
  glass.indexOfRefraction = 0.52;
  glass.alpha = 0.5;
  glass.directIntensity = 0.0;
  glass.environmentIntensity = 0.7;
  glass.cameraExposure = 0.66;
  glass.cameraContrast = 1.66;
  glass.microSurface = 1;
  glass.reflectivityColor = new BABYLON.Color3(0.2, 0.2, 0.2);
  glass.albedoColor = new BABYLON.Color3(0.95, 0.95, 0.95);

  BABYLON.SceneLoader.ImportMesh("", "./Assets/Models/", "realmap.glb", scene, (meshes) => {
    for (let i=0; i<meshes.length; i++) {
      meshes[i].checkCollisions = true;
      if (meshes[i].name == "Glass") {
        console.log("GLASS!");
        meshes[i].material = glass;
      }
    }
  });

  ////   JUMPING AND SPRINTING   ////
  let jumping = false;
  let sprinting = false;
  let cameraYMomentum = 0;

  document.addEventListener("keydown", function(event) {
    // Jump
    if (event.code == "Space") {
      if (!jumping) {
        cameraYMomentum = .35;
        camera._needMoveForGravity = false;
        jumping = true;
      };
    };
    // Sprint
    if (event.shiftKey && !sprinting) {
      sprinting = true;
      camera.speed = sprintSpeed;
      animateFOV(camera, 0.8, 1, 200); // Call the animateFOV function to gradually change FOV, (cameraObj, startFOV, endFOV, time in ms)
    };
    if (event.keyCode == 76 && !sprinting) {
      sprinting = true;
      camera.speed = superSprintSpeed;
      animateFOV(camera, 0.8, 1, 200);
    }
  });

  document.addEventListener("keyup", function(event) {
    // Cancel Sprint
    if (sprinting && !event.shiftKey) {
      sprinting = false;
      camera.speed = walkSpeed;
      animateFOV(camera, 1, 0.8, 200);
    };
  });

  scene.registerBeforeRender(function() {
    if (jumping) {
      camera.cameraDirection.y += cameraYMomentum;
      cameraYMomentum -= .01;
      if (cameraYMomentum < -.3) {
        cameraYMomentum = -.3;
      };
    };
  });

  camera.onCollide = function(collidedMesh) {
    if (jumping && cameraYMomentum < 0) {
      jumping = false;
      camera._needMoveForGravity = true;
    };
  };

  return scene;
};