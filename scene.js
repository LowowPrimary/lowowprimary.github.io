const walkSpeed = 1;
const runSpeed = 2;
const modelDirectory = "./Assets/Models/";

let map = {
    "Floor2": {
      "Height": 0,
      "Floor": true,
      "Map": ["##################################################",
            "#                                   *            #",
            "#                                                #",
            "#                                                #",
            "#                                   p            #",
            "#                             ^                  #",
            "#                                                #",
            "#                                                #",
            "#                                                #",
            "#                                                #",
            "#                                                #",
            "#############  ############################  ######",
            "#                                                #",
            "#                                                #",
            "#                                                #",
            "#                                                #",
            "#                                                #",
            "##########     ####################     ##########",
            "#        #     #                  #     #        #",
            "#        #     %                  %     #        #",
            "#        #     %                  %     #        #",
            "#        #     %                  %     #        #",
            "#        #     %                  %     #        #",
            "#        #     %                  %     #        #",
            "#        #     #                  #     #        #",
            "#        #     %                  %     #        #",
            "#              %                  %              #",
            "#              %                  %              #",
            "#        #     %                  %     #        #",
            "#        #     %                  %     #        #",
            "#        #     #                  #     #        #",
            "#        #     %                  %     #        #",
            "#        #     %                  %     #        #",
            "#        #     %                  %     #        #",
            "#        #     %                  %              #",
            "#              %                  %              #",
            "#              #                  #     #        #",
            "##########     ####################     ##########",
            "#                                                #",
            "#                                                #",
            "#                                                #",
            "#                                                #",
            "#                                                #",
            "#                                                #",
            "#                                                #",
            "#                                                #",
            "#                                                #",
            "#                                                #",
            "##################################################"]
      },
    
    "Floor1": {
      "Height": 0,
      "Floor": true,
      "Map": ["##################################################",
            "#                                   *            #",
            "#                                   p            #",
            "#                                                #",
            "#                                                #",
            "#                                                #",
            "#                                                #",
            "#                                                #",
            "#                                                #",
            "#                                                #",
            "#                                                #",
            "#############  ############################  ######",
            "#                                                #",
            "#                                                #",
            "#                                                #",
            "#                                                #",
            "#                                                #",
            "##########     ####################     ##########",
            "#        #     #                  #     #        #",
            "#        #     %                  %     #        #",
            "#        #     %                  %     #        #",
            "#        #     %                  %     #        #",
            "#        #     %                  %     #        #",
            "#        #     %                  %     #        #",
            "#        #     #                  #     #        #",
            "#        #     %                  %     #        #",
            "#              %                  %              #",
            "#              %                  %              #",
            "#        #     %                  %     #        #",
            "#        #     %                  %     #        #",
            "#        #     #                  #     #        #",
            "#        #     %                  %     #        #",
            "#        #     %                  %     #        #",
            "#        #     %                  %     #        #",
            "#        #     %                  %              #",
            "#              %                  %              #",
            "#              #                  #     #        #",
            "##########     ####################     ##########",
            "#                                                #",
            "#                                                #",
            "#                                                #",
            "#                                                #",
            "#                                                #",
            "#                                                #",
            "#                                                #",
            "#                                                #",
            "#                                                #",
            "#                                                #",
            "##################################################"]
      }
    
};

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
    
    
   
    ////   Create Map Items   ////
    var floorMaterial = new BABYLON.StandardMaterial("material", scene);
    floorMaterial.diffuseColor = new BABYLON.Color3(0.3, 0.3, 0.3);
    //floorMaterial.diffuseTexture = new BABYLON.Texture("./Assets/rockFloor.jpg", scene);
    floorMaterial.scale = .5;

    var wallMaterial = new BABYLON.StandardMaterial(scene);
    wallMaterial.diffuseColor = new BABYLON.Color3(1.0, .5, .5);
    
    var glassMaterial = new BABYLON.StandardMaterial(scene);
    glassMaterial.alpha = .2;
    glassMaterial.diffuseColor = new BABYLON.Color3(1.0, 1.0, 1.0);
	
	
	for (let [key, value] of Object.entries(map)) {

        let currFloor = value["Map"];
        let currFloorHeight = value["Height"];


        // Make Literal Floor
        let floor = BABYLON.MeshBuilder.CreateBox("wall", {
            width: 50,
            height: 1,
            depth: 50
        }, scene);
        let floorHeight;
        if (value["Floor"]) {   
            floorHeight = (currFloorHeight * 5) - 2;
        } else {
            floorHeight = ((currFloorHeight+1) * 5) - 2;
        }
        floor.position.y = floorHeight;
        floor.position.x = 25;
        floor.position.z = 25;

		
        let wallPhysicsImposter = new BABYLON.PhysicsImpostor(
            floor,
            BABYLON.PhysicsImpostor.BoxImpostor,
            {
                mass: 0,
                friction: 0.1,
                restitution: .85
            },
            scene
        );

        floor.collisionsEnabled = true;
        floor.checkCollisions = true;
        floor.material = floorMaterial;


        
        for (let y = 0; y < currFloor.length; y++) {
            for (let x = 0; x < currFloor[y].length; x++) {

				
			/*
            // Walls
            if (currFloor[y][x] != " ") {
                //alert(y + "  " + x);
				let wall = BABYLON.MeshBuilder.CreateBox("wall", {
                    width: 1,
                    height: 5,
                    depth: 1
                }, scene);
                // +1 is because floor height is 1, and don't want CFrame fighting

				wall.position.y = (currFloorHeight * 5) + 1;
				wall.position.x = x;
                wall.position.z = y;
				
				
				
				if (currFloor[y][x+1] != " ") {
					let loopX = x;
					let floorWidth = currFloor[y].length-1;
					while (currFloor[y][loopX] != " " && loopX < floorWidth) {
						loopX++;
					}
                    //alert(loopX);
					wall.width = loopX;
                    x = loopX;
                    
                    //alert(currFloor[y][loopX]);
                    //alert("x: " + loopX);
					
				} else if (currFloor[y+1][x] != " ") {
					let loopY = y;
					let floorHeight = Object.keys(map).length-1;
					while (currFloor[loopY][x] != " " && loopY < floorHeight) {
						loopY++;
					}
					wall.depth = loopY;
				}
				            


                // transparency if glass
                wall.material = wallMaterial;
                if (currFloor[y][x] == "%") {
                    wall.material = glassMaterial;
                } else {
                    wall.material = wallMaterial;
                }

                let wallPhysicsImposter = new BABYLON.PhysicsImpostor(
                    wall,
                    BABYLON.PhysicsImpostor.BoxImpostor,
                    {
                        mass: 0,
                        friction: 0.1,
                        restitution: .85
                    },
                    scene
                );

                wall.collisionsEnabled = true;
                wall.checkCollisions = true;

        };
		*/
		
        // Lights
        if (currFloor[y][x] == "*") {
          let light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(x, currFloorHeight * 5, y), scene);
        };
      };
    };
  };
	

	/*
    for (let [key, value] of Object.entries(map)) {

        let currFloor = value["Map"];
        let currFloorHeight = value["Height"];


        // Make Literal Floor
        let floor = BABYLON.MeshBuilder.CreateBox("wall", {
            width: 50,
            height: 1,
            depth: 50
        }, scene);
        let floorHeight;
        if (value["Floor"]) {   
            floorHeight = (currFloorHeight * 5) - 2;
        } else {
            floorHeight = ((currFloorHeight+1) * 5) - 2;
        }
        floor.position.y = floorHeight;
        floor.position.x = 25;
        floor.position.z = 25;


        let wallPhysicsImposter = new BABYLON.PhysicsImpostor(
            floor,
            BABYLON.PhysicsImpostor.BoxImpostor,
            {
                mass: 0,
                friction: 0.1,
                restitution: .85
            },
            scene
        );

        floor.collisionsEnabled = true;
        floor.checkCollisions = true;
        floor.material = floorMaterial;



        for (let y = 0; y < currFloor.length; y++) {
            for (let x = 0; x < currFloor[y].length; x++) {

            // Walls
            if (currFloor[y][x] == "#" || currFloor[y][x] == "%") {

                let wall = BABYLON.MeshBuilder.CreateBox("wall", {
                    width: 1,
                    height: 5,
                    depth: 1
                }, scene);
                wall.position.x = x;
                wall.position.z = y;
                // +1 is because floor height is 1, and don't want CFrame fighting
                wall.position.y = (currFloorHeight * 5) + 1;


                // transparency if glass
                wall.material = wallMaterial;
                if (currFloor[y][x] == "%") {
                    wall.material = glassMaterial;
                } else {
                    wall.material = wallMaterial;
                }

                let wallPhysicsImposter = new BABYLON.PhysicsImpostor(
                    wall,
                    BABYLON.PhysicsImpostor.BoxImpostor,
                    {
                        mass: 0,
                        friction: 0.1,
                        restitution: .85
                    },
                    scene
                );

                wall.collisionsEnabled = true;
                wall.checkCollisions = true;

        };

        // Lights
        if (currFloor[y][x] == "*") {
          let light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(x, currFloorHeight * 5, y), scene);
        };
      };
    };
  };

	*/

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
	var meshesToLoad = ["pot.fbx", "Map"];


	var toLoad = meshesToLoad.length;
	var whenDoneFunction = function () {
		toLoad--;

		if (toLoad === 0) {
			alert("loading done!");
		}
	}


	for (var index = 0; index < meshesToLoad.length; index++) {
		alert(meshesToLoad[index]);
		BABYLON.SceneLoader.ImportMesh("", "./Assets/Models/", meshesToLoad[index], scene, function (newMeshes) {
			// Set the target of the camera to the first imported mesh
			newMeshes.position.x = 5;
			newMeshes.position.y = 2;
			newMeshes.position.z = 5;
			whenDoneFunction();
		});
	}
	*/	
	
  BABYLON.SceneLoader.ImportMeshAsync("", modelDirectory, "realMap.glb", scene, (meshes) => {
    alert("ey");
    //alert(meshes);
    for (let [key, value] of Object.entries(meshes)) {
      console.log(key + " " + value);
    }
    console.log(meshes[0].scaling);
    //meshes.scaling = new BABYLON.Vector3(0.25, 0.25, 0.25);
    meshes[0].position.x = 10;
    meshes[0].position.z = 30;
	 // newMeshes[0].position.x = -20;

    alert("HUHH");
  });

    
  return scene;
};

