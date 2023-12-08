const walkSpeed = 1;
const runSpeed = 2;
const modelDirectory = "./Assets/Models/";

let createPointerLock = function(scene) {
	
  let canvas = scene.getEngine().getRenderingCanvas();
  canvas.addEventListener("click", event => {
	  alert("CLICKED");
    canvas.requestPointerLock = canvas.requestPointerLock || canvas.msRequestPointerLock || canvas.mozRequestPointerLock || canva;
    if(canvas.requestPointerLock) {
      canvas.requestPointerLock();
    }
  }, false);
};



function animateFOV(camera, start, end, duration) {
  let startTime = performance.now();
  function updateFOV(currentTime) {
    let elapsedTime = currentTime - startTime;
    if (elapsedTime >= duration) {
      camera.fov = end;
      return;
    }
    let time = elapsedTime / duration;
    let fov = start + (end - start) * time;
    camera.fov = fov;
    requestAnimationFrame(updateFOV);
  }
  requestAnimationFrame(updateFOV);
}


let createScene = function(canvas, engine) {


  // setup scene
	const scene = new BABYLON.Scene(engine);
	const earthGravity = -9.81;
 	scene.gravity = new BABYLON.Vector3(0, earthGravity / 60, 0); // 60 is (assumed) fps
  	scene.enablePhysics(scene.gravity, new BABYLON.CannonJSPlugin());



  ////   CAMERA   ////

  // cycle through map and find p (player spawn)
	
    var pSpawnX;
    var pSpawnY;
    var pSpawnHeight;
    for (let [key, value] of Object.entries(map)) {
        let currFloor = value["Map"];

        for (let y = 0; y < currFloor.length; y++) {

            if (currFloor[y].indexOf("p") != "-1") {
                pSpawnX = currFloor[y].indexOf("p");
                pSpawnY = y;
            pSpawnHeight = (value["Height"] * 5) + 2;
            };
        };
    };

    // actual creation
    const camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(pSpawnX, pSpawnHeight, pSpawnY), scene);
	
    //const camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(pSpawnX, pSpawnHeight, pSpawnY), scene);
    camera.attachControl(canvas, true);

    // Move on WASD
    camera.keysUp.push(87);
    camera.keysDown.push(83);
    camera.keysLeft.push(65);
    camera.keysRight.push(68);


  camera.speed = 1;
  camera.fov = 0.8;
  //inertia is basically sliperyness
  camera.inertia = .01;


    // ellipsoid is the collision, which is an ellipse (but in 3d)
    camera.ellipsoid = new BABYLON.Vector3(0.5, 0.5, 0.5);
    camera.checkCollisions = true;
    //camera.applyGravity = true;
    camera._needMoveForGravity = true;
    camera.collisionsEnabled = true;
    camera.useBouncingBehavior = false;


    
    
    /*
    let displayImage = new BABYLON.StandardMaterial("material", scene);
    displayImage.diffuseTexture = new BABYLON.Texture("./Assets/testImg2.jpg", scene);
    let display = BABYLON.MeshBuilder.CreateBox("wall", {
        width: 3,
        height: 2,
        depth: .1
    }, scene);
    display.position.x = 40;
    display.position.z = 10;
    display.position.y = .2;
    display.material = displayImage;
    display.rotation = new BABYLON.Vector3(0, (3*Math.PI)/2, 0);
    
    let displayImage2 = new BABYLON.StandardMaterial("material", scene);
    displayImage2.diffuseTexture = new BABYLON.Texture("./Assets/testImg.jpg", scene);
    let display2 = BABYLON.MeshBuilder.CreateBox("wall", {
        width: 2,
        height: 3,
        depth: 1
    }, scene);
    display2.position.x = 36;
    display2.position.z = 10;
    display2.position.y = .2;
    display2.material = displayImage2;
    
    */
    
    
  let light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(20, 20, 20), scene);	

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

	
	
	

	alert("start");
/*
  BABYLON.SceneLoader.ImportMeshAsync("", modelDirectory, "realmap.glb", scene, (meshes) => {
    alert("ey");
    //alert(meshes);
    for (let [key, value] of Object.entries(meshes)) {
      console.log(key + " " + value);
    }
    alert("really?");
    console.log(meshes[0].scaling);
    //meshes.scaling = new BABYLON.Vector3(0.25, 0.25, 0.25);
    meshes[0].position.x = 10;
    meshes[0].position.z = 30;
    alert("position changed");
	 // newMeshes[0].position.x = -20;

    alert("HUHH");
  });
*/
    
  return scene;
};

