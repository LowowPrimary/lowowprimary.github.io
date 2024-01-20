// floor is whether it's floor or roof
// don't know what first line means. this line just to recommit cuz something shady going on
// still not commiting script, don't know why ;=;
let runButton = document.getElementById("runButton");


let createPointerLock = function(scene) {
    let canvas = scene.getEngine().getRenderingCanvas();
    canvas.addEventListener("click", event => {
      canvas.requestPointerLock = canvas.requestPointerLock || canvas.msRequestPointerLock || canvas.mozRequestPointerLock || canva;
      if(canvas.requestPointerLock) {
        canvas.requestPointerLock();
      }
    }, false);
  };
  
  
  // currently default loading screen only, so slashed it out
  let showLoadingScreen = function(canvas, engine) {
    //let defaultLoadingScreen = new BABYLON.DefaultLoadingScreen(canvas, "Loading", "black");
  
    //engine.loadingScreen = defaultLoadingScreen;
    //engine.displayLoadingUI();
  };
  
  let hideLoadingScreen = function(engine) {
    engine.hideLoadingUI();
  };
  

runButton.addEventListener("click", function() {
	
    alert("This is only expirimental. Only upper floor of 200 building has images in it. Rest is kind of empty.");

    document.getElementById("crosshair").style.display = "flex";
    //alert("clicked");
    //hide everything
    document.getElementById("headline").style.display = "none";
    document.getElementById("menu").style.display = "none";

    document.getElementById("DPIPage").style.display = "none";
    document.getElementById("DPIImages").style.display = "none";
    document.getElementById("GDPage").style.display = "none";
    document.getElementById("GDImages").style.display = "none";

    
    // get canvas, create engine
    let canvas = document.getElementById("canvas");
    canvas.style.display = "flex";
	
    let engine = new BABYLON.Engine(canvas, true);
    //alert("engine");

    // create scene
    let scene = createGameScene(canvas, engine);
	//alert("scene");
	
	// lock mouse
  	document.addEventListener("click", function() {
		canvas.requestPointerLock = canvas.requestPointerLock || canvas.msRequestPointerLock || canvas.mozRequestPointerLock // || canvas;
		if(canvas.requestPointerLock) {
		  canvas.requestPointerLock();
		}
  	});

    //alert("pointer lock");


    // render screen
    engine.runRenderLoop(function() {
        scene.render();
    });

    window.addEventListener("resize", function() {
        engine.resize();
    });
    //alert("yayyyy!");
    
});
















