// floor is whether it's floor or roof
// don't know what first line means. this line just to recommit cuz something shady going on
// still not commiting script, don't know why ;=;
let runButton = document.getElementById("runButton");
import { createGameScene } from "./scene.js";

runButton.addEventListener("click", function() {
	
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
    createGameScene(canvas, engine);
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
















