// floor is whether it's floor or roof
let runButton = document.getElementById("runButton");

let createPointerLock = function (scene) {
  let canvas = scene.getEngine().getRenderingCanvas();
  let crosshair = document.getElementById("crosshair");
  crosshair.addEventListener("click", event => {
    canvas.requestPointerLock = canvas.requestPointerLock || canvas.msRequestPointerLock || canvas.mozRequestPointerLock || canva;
    if (canvas.requestPointerLock) {
      canvas.requestPointerLock();
    }
  }, false);
};

runButton.addEventListener("click", function () {
  let cannon = document.createElement("script"); cannon.src = "https://cdnjs.cloudflare.com/ajax/libs/cannon.js/0.6.2/cannon.min.js"; cannon.type = 'text/javascript';
  document.head.appendChild(cannon);
  let babylonS = document.createElement("script"); babylonS.src = "https://cdn.babylonjs.com/babylon.js"; babylonS.type = 'text/javascript';
  document.head.appendChild(babylonS);
  let loaders = document.createElement("script"); loaders.src = "https://cdn.babylonjs.com/loaders/babylonjs.loaders.min.js"; loaders.type = 'text/javascript';
  babylonS.onload = function() {document.head.appendChild(loaders);};
  
  alert("This is only expirimental. Only upper floor of 200 building has images in it. Rest is kind of empty. To start, click the white box in the middle (crosshair)\n CONTROLS \n  WASD/Arrow Keys: Movement \n  Space: Jump\n  Shift: Sprint\n  Key L: Super Sprint (really fast)\n  Mouse: Turn");

  loaders.onload = function() {
    document.getElementById("crosshair").style.display = "flex";
    document.getElementById("headline").style.display = "none";
    document.getElementById("menu").style.display = "none";
    document.getElementById("DPIPage").style.display = "none";
    document.getElementById("DPIImages").style.display = "none";
    document.getElementById("GDPage").style.display = "none";
    document.getElementById("GDImages").style.display = "none";

    let canvas = document.getElementById("canvas");
    canvas.style.display = "flex";
    let engine = new BABYLON.Engine(canvas, true);
    let scene = createGameScene(canvas, engine);
    createPointerLock(scene);
    engine.runRenderLoop(function () {
      scene.render();
    });
    window.addEventListener("resize", function () {
      engine.resize();
    });
  };
});