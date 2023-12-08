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


export {
  createPointerLock,
  showLoadingScreen,
  hideLoadingScreen
}


