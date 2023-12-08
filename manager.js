// floor is whether it's floor or roof

let runButton = document.getElementById("runButton");

runButton.addEventListener("click", function() {
	
    //alert("clicked");
    runButton.style.display = "none";
    //hide everything
    document.getElementById("headerBackground").style.display = "none";
    document.getElementById("pagesParent").style.display = "none";
    document.getElementById("buttonTest").style.display = "none";
    

    
    // get canvas, create engine
    let canvas = document.getElementById("canvas");
    canvas.style.display = "flex";
	
    let engine = new BABYLON.Engine(canvas, true);
    //alert("engine");

    // create scene
    let scene = createScene(canvas, engine);
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
















