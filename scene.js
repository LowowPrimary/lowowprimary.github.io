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
  [56, 4, -8, "W"], // Black's
  [57, 4, -35, "W"], // Hamman's
  [45, 4, -38, "N"], // Hamman's 2
  [55, 4, 3, "W"], // left wing 1
  [55, 4, 14, "W"], // left wing 1
  [55, 4, 22, "W"], // left wing 2
  [55, 4, 38, "W"], // left wing 2
  [17, 4, -29, "S"], // no clue
  [22, 4, -36, "W"], // no clue
  [36, 4, -29, "S"], // no clue 2
  [40, 4, -35, "W"], // no clue 2
  [-1, 4, 1, "E"], // Brink's
  [-1, 4, 16, "E"], // Brink's 2
  [-1, 4, 25, "E"], // no clue right wing
  [-1, 4, 35, "E"] // no clue right wing 
];

const walkSpeed = 1;
const runSpeed = 8;

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


  // setup scene
  const scene = new BABYLON.Scene(engine);
  const earthGravity = -9.81;
  scene.gravity = new BABYLON.Vector3(0, earthGravity / 60, 0); // 60 is (assumed) fps

  scene.enablePhysics(scene.gravity, new BABYLON.CannonJSPlugin());
  scene.clearColor = new BABYLON.Color3(0, .3, .5);

  const camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(-10, 7, -38), scene);


  camera.attachControl(canvas, true);

  // Move on WASD
  camera.keysUp.push(87);
  camera.keysDown.push(83);
  camera.keysLeft.push(65);
  camera.keysRight.push(68);


  camera.speed = walkSpeed;
  camera.fov = 0.8;
  //inertia is basically sliperyness (resistance to movement)
  camera.inertia = .01;

  camera.angularSensibility = 1400;
  
  // ellipsoid is the collision, which is an ellipse (but in 3d)
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


  let images = [
    "./Assets/DP/AbstractAlphabet/AbsractAlphabet-1.jpg",
    "./Assets/DP/AbstractAlphabet/AbsractAlphabet-2.jpg",
    "./Assets/DP/AbstractAlphabet/AbsractAlphabet-3.jpg",
    "./Assets/DP/AbstractAlphabet/AbsractAlphabet-4.jpg",
    "./Assets/DP/AbstractAlphabet/AbsractAlphabet-5.jpg",
    "./Assets/DP/AbstractAlphabet/AbsractAlphabet-6.jpg",
    "./Assets/DP/AbstractAlphabet/AbstractAlphabet-7.jpg",
    "./Assets/DP/AbstractAlphabet/AbsractAlphabet-8.jpg",
    "./Assets/DP/AbstractAlphabet/AbsractAlphabet-9.jpg",
    "./Assets/DP/AbstractAlphabet/AbsractAlphabet-10.jpg",
    "./Assets/DP/AbstractAlphabet/AbstractAlphabet-11.jpg",
    "./Assets/DP/AbstractAlphabet/AbstractAlphabet-12.jpg",
    "./Assets/DP/AbstractAlphabet/AbsractAlphabet-13.jpg",
    "./Assets/DP/AbstractAlphabet/AbsractAlphabet-14.jpg",
    "./Assets/DP/AbstractAlphabet/AbstractAlphabet-15.jpg",
    "./Assets/DP/AbstractAlphabet/AbsractAlphabet-16.jpg",
    "./Assets/DP/AbstractAlphabet/AbsractAlphabet-17.jpg",
    "./Assets/DP/AbstractAlphabet/AbsractAlphabet-18.jpg",
    "./Assets/DP/AbstractAlphabet/AbstractAlphabet-19.jpg",
    "./Assets/DP/AbstractAlphabet/AbsractAlphabet-20.jpg",
    "./Assets/DP/AbstractAlphabet/AbsractAlphabet-21.jpg",
    "./Assets/DP/AbstractAlphabet/AbsractAlphabet-22.jpg",
    "./Assets/DP/AbstractAlphabet/AbstractAlphabet-23.jpg",
    "./Assets/DP/AbstractAlphabet/AbstractAlphabet-24.jpg",
    "./Assets/DP/AbstractAlphabet/AbstractAlphabet-25jpg",
    "./Assets/DP/AbstractAlphabet/AbstractAlphabet-26jpg",
    "./Assets/DP/AbstractAlphabet/AbstractAlphabet-27jpg",
    "./Assets/DP/AbstractAlphabet/AbstractAlphabet-28jpg",
    "./Assets/DP/AbstractAlphabet/AbstractAlphabet-29jpg",
    "./Assets/DP/AbstractAlphabet/AbstractAlphabet-30jpg",
    "./Assets/DP/AbstractAlphabet/AbstractAlphabet-31jpg",
    "./Assets/DP/AbstractAlphabet/AbstractAlphabet-32jpg",
    "./Assets/DP/AbstractAlphabet/AbstractAlphabet-33jpg",
    "./Assets/DP/AbstractAlphabet/AbstractAlphabet-34jpg",
    "./Assets/DP/AbstractAlphabet/AbstractAlphabet-35jpg",

    "./Assets/DP/ApeturePriority/ApeturePriority-1.jpg",
    "./Assets/DP/ApeturePriority/ApeturePriority-2.jpg",
    "./Assets/DP/ApeturePriority/ApeturePriority-3.jpg",
    "./Assets/DP/ApeturePriority/ApeturePriority-4.jpg",
    "./Assets/DP/ApeturePriority/ApeturePriority-5.jpg",
    "./Assets/DP/ApeturePriority/ApeturePriority-6.jpg",
    "./Assets/DP/ApeturePriority/ApeturePriority-7.jpg",
    "./Assets/DP/ApeturePriority/ApeturePriority-8.jpg",
    "./Assets/DP/ApeturePriority/ApeturePriority-9.jpg",
    "./Assets/DP/ApeturePriority/ApeturePriority-10.jpg",
    "./Assets/DP/ApeturePriority/ApeturePriority-12.jpg",
    "./Assets/DP/ApeturePriority/ApeturePriority-13.jpg",
    "./Assets/DP/ApeturePriority/ApeturePriority-14.jpg",
    "./Assets/DP/ApeturePriority/ApeturePriority-15.jpg",

    "./Assets/DP/Repetition/Repetition-1.jpg",
    "./Assets/DP/Repetition/Repetition-2.jpg",
    "./Assets/DP/Repetition/Repetition-3.jpg",
    "./Assets/DP/Repetition/Repetition-4.jpg",
    "./Assets/DP/Repetition/Repetition-5.jpg",
    "./Assets/DP/Repetition/Repetition-6.jpg",
    "./Assets/DP/Repetition/Repetition-7.jpg",
    "./Assets/DP/Repetition/Repetition-8.jpg",
    "./Assets/DP/Repetition/Repetition-9.jpg",
    "./Assets/DP/Repetition/Repetition-10.jpg",
    "./Assets/DP/Repetition/Repetition-11.jpg",
    "./Assets/DP/Repetition/Repetition-12.jpg",
    "./Assets/DP/Repetition/Repetition-13.jpg",
    "./Assets/DP/Repetition/Repetition-14.jpg",
    "./Assets/DP/Repetition/Repetition-15.jpg",
    "./Assets/DP/Repetition/Repetition-16.jpg",
    "./Assets/DP/Repetition/Repetition-17.jpg",
    "./Assets/DP/Repetition/Repetition-18.jpg",
    "./Assets/DP/Repetition/Repetition-19.jpg",
    "./Assets/DP/Repetition/Repetition-20.jpg",
    "./Assets/DP/Repetition/Repetition-21.jpg",
    "./Assets/DP/Repetition/Repetition-22.jpg",
  ]


  let i = 0;

  /*
    for (let [key, value] of Object.entries(picLocations)) {
    let display = BABYLON.MeshBuilder.CreateBox("wall", {
        width: 3,
        height: 2,
        depth: .1
    }, scene);

    display.position.x = value[0];
    display.position.y = value[1];
    display.position.z = value[2];
    display.material = displayImage;
    display.rotation = new BABYLON.Vector3(0, directionKey[value[3]], 0);//(3*Math.PI)/2, 0);

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

  */
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


    console.log(i);
    let displayImage = new BABYLON.StandardMaterial("material", scene);
    displayImage.diffuseTexture = new BABYLON.Texture(images[i], scene);
    display.material = displayImage;
    i++;
  

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
      camera.speed = runSpeed;
      animateFOV(camera, 0.8, 1, 200); // Call the animateFOV function to gradually change FOV, (cameraObj, startFOV, endFOV, time in ms)
    };

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










