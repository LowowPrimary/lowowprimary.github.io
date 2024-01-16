// x, y, z, rotation
// N:Math.PI   E:(3(Math.PI)/2)   S:0   W:(Math.PI/2)
// please, github, update scene.js
const picLocations = [
  [-3, -27, 38, ((3*Math.PI)/2)],
  [-3, -25, 36, ((3*Math.PI)/2)]
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

  const camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(-3, 0, 38), scene);

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

  
  let displayImage = new BABYLON.StandardMaterial("material", scene);
  displayImage.diffuseTexture = new BABYLON.Texture("./Assets/DP/AbstractAlphabet/AbstractAlphabet-5.png", scene);

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
    display.rotation = new BABYLON.Vector3(0, value[3], 0);//(3*Math.PI)/2, 0);

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
  BABYLON.SceneLoader.ImportMesh("", "./Assets/Models/", "realmap.glb", scene, (meshes) => {

    for (let i=0; i<meshes.length; i++) {
      meshes[i].checkCollisions = true;

    }
    
  });



/*
  var button = BABYLON.MeshBuilder.CreateBox("button", {size: 1}, scene);
  button.position = new BABYLON.Vector3(30, 10, 30);

  var clickMaterial = new BABYLON.StandardMaterial("material", scene);
  clickMaterial.diffuseTexture = new BABYLON.Texture("./Assets/GD/DesignElementInfographic.jpg", scene);
  clickMaterial.scale = .5;


  button.actionManager = new BABYLON.ActionManager(scene);
  button.material = clickMaterial;


  // THE ANIMATION THAT I CUT THE CODE FROM

  button.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, function() {
    button.animations = [increaseAnimation];
    scene.beginAnimation(button, 0, 5, false);
  }));    


  button.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger, function() {
    button.animations = [decreaseAnimation];
    scene.beginAnimation(button, 0, 5, false);
  }));




  let camButton = document.getElementById("moveToCam");

  let x = document.getElementById("x");
  let y = document.getElementById("y");
  let z = document.getElementById("z");

  x.value = camera.position.x;
  y.value = camera.position.y;
  z.value = camera.position.z;


  button.position = new BABYLON.Vector3(30, 10, 30);


  function change() {

    if (Number.isInteger(x.value) && Number.isInteger(y.value) && Number.isInteger(z.value)) {

        alert("1");
        button.position = new BABYLON.Vector3(x.value, y.value, z.value);
        alert(button.position);
        console.log(button.position);
    }
  }


  x.addEventListener("change", change);
  y.addEventListener("change", change);
  z.addEventListener("change", change);


  function moveCube() {
     x.value = camera.position.x;
     y.value = camera.position.y;
     z.value = camera.position.z;
     button.position = new BABYLON.Vector3(x.value, y.value, z.value);
     console.log("success?");
  }
  camButton.addEventListener("click", moveCube);

  var scorePoints = 0;
  button.actionManager.registerAction(
    new BABYLON.ExecuteCodeAction(
      BABYLON.ActionManager.OnPickTrigger,
      function() {
        let score = document.getElementById("score");

        scorePoints += 1;
        score.innerText = scorePoints + " / 15";
        if (score >= 15) {
          alert("WIN");
        }
      }
    )
  );
  */


  
  ////   JUMPING AND SPRINTING   ////
  let jumping = false;
  let sprinting = false;
  let cameraYMomentum = 0;

  document.addEventListener("keydown", function(event) {

    // MOVE THE CUBE
    if (event.code == "Enter") {
      moveCube();
    }
    

    
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

};










