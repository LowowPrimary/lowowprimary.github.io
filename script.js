let DPICover = document.getElementById("DPICover");
let GDCover = document.getElementById("GDCover");
let animCover = document.getElementById("AnimCover");
let background = document.getElementById("theBackgroundCarousel");
let menu = document.getElementById("menu");
let backToMainMenu = document.getElementById("backToMainMenu");

let fullscreened = false;

let startCovers = document.querySelectorAll(".introAnim");
window.onload = function() {
  startCovers.forEach(function(cover) {
    cover.style.left = "120%";
  })
};

let bgLength = document.querySelectorAll(".background").length;
let bgIndex = 0;
document.querySelectorAll(".background")[bgIndex].style.opacity = 1;
function bgUpdateTimeout() {
  document.querySelectorAll(".background")[bgIndex].style.opacity = 0;
  if (bgIndex+1 > bgLength-1) {
    bgIndex = 0;
  } else {
    bgIndex++;
  }
  document.querySelectorAll(".background")[bgIndex].style.opacity = 1;
}
setInterval(bgUpdateTimeout, 6000);

let resumeBtn = document.getElementById("resumeBtn");
let resumePage = document.getElementById("resumePage");
let aboutMePage = document.getElementById("aboutMePage");

let blackCover = document.getElementById("blackCover");
resumeBtn.addEventListener("click", function() {
  blackCover.style.top = "0";
  aboutMePage.style.display = "none";
  resumePage.style.display = "block";
});

let aboutMe = document.getElementById("aboutMe");
aboutMe.addEventListener("click", function() {
  resumePage.style.display = "none";
  aboutMePage.style.display = "flex";
  blackCover.style.top = "0";
});

let bFSP = document.getElementById("backFromSubPage");
bFSP.addEventListener("click", function() {
  blackCover.style.top = "-100%";
});


let bTMMBtns = document.querySelectorAll(".backToMainMenu");
bTMMBtns.forEach(function (button) {
  button.addEventListener("click", function () {
    fullscreened = false;
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(function () {
      document.getElementById("DPIPage").style.top = "-100%";
      document.getElementById("GDPage").style.top = "-100%";
      document.getElementById("AnimPage").style.top = "-100%";
      background.style.opacity = "100%";
      menu.style.opacity = "100%";
      document.getElementById("AnimImages").style.display = "none";
      document.getElementById("DPIImages").style.display = "none";
      document.getElementById("GDImages").style.display = "none";
    }, 700);
  });
});

let sectionsKey = {
  0: [
    DPICover,
    document.getElementById("DPIImages"),
    document.getElementById("DPIPage")
  ],
  1: [
    GDCover,
    document.getElementById("GDImages"),
    document.getElementById("GDPage")
  ],
  2: [
    animCover,
    document.getElementById("AnimImages"),
    document.getElementById("AnimPage")
  ]
};

let norLoc = [0, 100, 0];
let invLoc = [100, 0, 0];
async function startSection(iteration) {
  let cover = sectionsKey[iteration][0];
  let images = sectionsKey[iteration][1];
  let page = sectionsKey[iteration][2];
  
  if (fullscreened) {return;}
  fullscreened = true;

  cover.style.left = invLoc[iteration] + "%";
  if (iteration == 2) {
    cover.style.top = "-100%";
  }

  background.style.opacity = "0";
  menu.style.opacity = "0";
  cover.style.opacity = "0";
  await new Promise(resolve => setTimeout(resolve, 1000));
  page.style.top = "0";
  images.style.display = "flex";
  await new Promise(resolve => setTimeout(resolve, 1000));
  cover.style.opacity = "100%";

  if (iteration == 2) {
    cover.style.top = "100%";
    cover.style.transform = "";
  } else {
    cover.style.left = norLoc[iteration] + "%";
    cover.style.transform = "translate(" + (invLoc[iteration]*-1) + "%, 0)";
  } 
}

document.getElementById("DPIMainPage").addEventListener("click", function() {
  startSection(0);
});
DPICover.addEventListener("click", function() {
  startSection(0);
});
document.getElementById("GDMainPage").addEventListener("click", function() {
  startSection(1);
});
GDCover.addEventListener("click", function() {
  startSection(1);  
});

document.getElementById("AnimMainPage").addEventListener("click", function() {
  startSection(2);
});
animCover.addEventListener("click", function() {
  startSection(2);
});


let covers = document.querySelectorAll(".cover");
for (let i=0; i<covers.length; i++) {
  covers[i].addEventListener("mouseleave", function() {
    if (!fullscreened) {
      covers[i].style.transform = "translate(" + [-100, 0, 0][i] + "%, 0)";
      background.style.opacity = "100%";
    }  
  });
}

let tContainers = document.querySelectorAll(".tContainer");
for (let i=0; i<tContainers.length; i++) {
  tContainers[i].addEventListener("mouseenter", function() {
    if (!fullscreened) {
      covers[i].style.transform = "translate(" + [0, -100, 0][i] + "%," + [0, 0, -40][i] + "%)";
      background.style.opacity = "0%";
    }
  });
  tContainers[i].addEventListener("mouseleave", function() {
    if (!fullscreened && !covers[i].matches(":hover")) {
      covers[i].style.transform = "translate(" + [-100, 0, 0][i] + "%, 0)";
      background.style.opacity = "100%";
    }
  });
}

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn")
const carousel = document.getElementById("carousel");
let carouselIndex = document.querySelectorAll(".carouselIndex");
for (let i=1; i<36; i++) {
  let img = document.createElement("img");
  img.classList.add("carouselObj");
  img.src = ("./Assets/DP/AbstractAlphabet/AbstractAlphabet-" + i + ".jpg");
  carousel.appendChild(img);
}
let carouselObjects = document.querySelectorAll(".carouselObj");
const carouselLen = carouselObjects.length;

const abstractAlphabetText = {
  "1": "Apprehension",
  "2": "Bell 1",
  "3": "Bell 2",
  "4": "Button",
  "5": "Citizenship",
  "6": "Disclaimer",
  "7": "Examiner",
  "8": "Exhibit",
  "9": "Field",
  "10": "Grass",
  "11": "Horizon",
  "12": "Inscription",
  "13": "Jesting Area",
  "14": "Knob",
  "15": "Logo",
  "16": "Manhole",
  "17": "Neighberhood",
  "18": "Outlet",
  "19": "Oxygen Supplier",
  "20": "Painting",
  "21": "Petals",
  "22": "Propaganda 1",
  "23": "Propaganda 2",
  "24": "Questionable Dirt Traces",
  "25": "Reservoir",
  "26": "Rocks",
  "27": "Rooftop",
  "28": "Shortcut",
  "29": "Table",
  "30": "Utopia",
  "31": "Valve",
  "32": "Work Surface",
  "33": "(e)Xit",
  "34": "Yard (in background)",
  "35": "Zig-Zagging Leaves"
};

let currentIndex = 0;
carouselIndex[0].textContent = abstractAlphabetText[currentIndex+1] + " - " + (currentIndex+1) + "/" + carouselLen;

function updateCarousel(newIndex) {
  carouselObjects[currentIndex].style.opacity = 0;
  if (newIndex < 0) {
    newIndex = carouselLen - 1;
    carouselObjects[newIndex].style.opacity = 1;
  } else if (newIndex > carouselLen - 1) {
    newIndex = 0;
    carouselObjects[newIndex].style.opacity = 1;
  } else {
    carouselObjects[newIndex].style.opacity = 1;
  }
  currentIndex = newIndex;
  carouselIndex[0].textContent = abstractAlphabetText[currentIndex+1] + " - " + (currentIndex+1) + "/" + carouselLen;
}

document.getElementById("prevBtn").addEventListener("click", function() {updateCarousel(currentIndex-1);});
document.getElementById("nextBtn").addEventListener("click", function() {updateCarousel(currentIndex+1);});
function carouselTimeout() {
  updateCarousel(currentIndex+1);
}
setInterval(carouselTimeout, 3000);

const imageDiv = document.getElementById("autoscroller");
for (let i=1; i<16; i++) {
  let img = document.createElement("img");
  img.src = "./Assets/DP/ApeturePriority/ApeturePriority-" + i + ".jpg";
  autoscroller.appendChild(img);
}

let scrollAmount = 0;
function scrollImages() {
  if (!(imageDiv.matches(":hover"))) {
    scrollAmount += 4; 
    imageDiv.scrollTo(scrollAmount, 0);
    if (scrollAmount >= imageDiv.scrollWidth - imageDiv.clientWidth) {
      scrollAmount = 0;
    }
  } else {
    scrollAmount = imageDiv.scrollLeft;
  }
}
setInterval(scrollImages, 20);