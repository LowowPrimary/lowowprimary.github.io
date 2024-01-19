let DPICover = document.getElementById("DPICover");
let GDCover = document.getElementById("GDCover");
let background = document.getElementById("menu");
let menu = document.getElementById("menu");
let backToMainMenu = document.getElementById("backToMainMenu");

let fullscreened = false;

// ON LOAD ANIMATION
window.onload = function() {

  document.getElementById("startCover").style.left = "120%";
  document.getElementById("startCover1").style.left = "120%";
  document.getElementById("startCover2").style.left = "120%";
  document.getElementById("startCover3").style.left = "120%";

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
  setTimeout(bgUpdateTimeout, 6000);
}

setTimeout(bgUpdateTimeout, 6000);




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

bTMMBtns.forEach(function(button) {
  button.addEventListener("click", function() {
    fullscreened = false;
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  
    setTimeout(function(){
        document.getElementById("DPIPage").style.top = "-100%";
        document.getElementById("GDPage").style.top = "-100%";
  
        background.style.opacity = "100%";
        menu.style.opacity = "100%";
  
        document.getElementById("DPIImages").style.display = "none";
        document.getElementById("GDImages").style.display = "none";
    }, 700);
    
  });
});



async function startDPI() {
  fullscreened = true;

  DPICover.style.left = "100%";
  background.style.opacity = "0%";
  menu.style.opacity = "0%";
  document.getElementById("DPICover").style.opacity = "0%";

  await new Promise(resolve => setTimeout(resolve, 1000));


  document.getElementById("DPIPage").style.top = "0%";

  let DPIImages = document.getElementById("DPIImages");
  DPIImages.style.display = "flex";

}



document.getElementById("DPIMainPage").addEventListener("click", function() {
  if (!fullscreened) {
    startDPI();
  }
});
DPICover.addEventListener("click", function() {
  if (!fullscreened) {
    startDPI();
  }
});
document.getElementById("DPIMainPage").addEventListener("mouseenter", function() {
  if (!fullscreened) {
    DPICover.style.transform = "translate(0, 0)";
    background.style.opacity = "0%";
  } 
});

DPICover.addEventListener("mouseleave", function() {
  if (!fullscreened) {
    DPICover.style.transform = "translate(-100%, 0)";
    background.style.opacity = "100%";
  }
});



async function startGD() {
  fullscreened = true;
  
  GDCover.style.left = "0";
  background.style.opacity = "0%";
  menu.style.opacity = "0%";
  document.getElementById("GDCover").style.opacity = "0%";
  
  await new Promise(resolve => setTimeout(resolve, 1000));


  document.getElementById("GDPage").style.top = "0%";

  let GDImages = document.getElementById("GDImages");
  GDImages.style.display = "flex";
}

document.getElementById("GDMainPage").addEventListener("click", function() {
  if (!fullscreened) {
    startGD();
  }
});
GDCover.addEventListener("click", function() {
  if (!fullscreened) {
    startGD();    
  }
});
document.getElementById("GDMainPage").addEventListener("mouseenter", function() {
  if (!fullscreened) {
    GDCover.style.left = "70%";
    background.style.opacity = "0%";
  }
});

GDCover.addEventListener("mouseleave", function() {
  if (!fullscreened) {
    GDCover.style.left = "100%";
    background.style.opacity = "100%";
  }
});


//tcontainer.addEventListener("", function() {});


const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn")
const carousel = document.getElementById("carousel");
let carouselIndex = document.querySelectorAll(".carouselIndex");

const carouselLen = document.querySelectorAll('.carouselObj').length;


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

  console.log(newIndex);
  document.querySelectorAll('.carouselObj')[currentIndex].style.opacity = 0;

  if (newIndex < 0) {
    newIndex = carouselLen - 1;
    document.querySelectorAll('.carouselObj')[newIndex].style.opacity = 1;
  } else if (newIndex > carouselLen - 1) {
    newIndex = 0;
    document.querySelectorAll('.carouselObj')[newIndex].style.opacity = 1;
  } else {
    document.querySelectorAll('.carouselObj')[newIndex].style.opacity = 1;
  }

  currentIndex = newIndex;
  carouselIndex[0].textContent = abstractAlphabetText[currentIndex+1] + " - " + (currentIndex+1) + "/" + carouselLen;

}

document.getElementById("prevBtn").addEventListener("click", function() {
  updateCarousel(currentIndex-1);
});

document.getElementById("nextBtn").addEventListener("click", function() {
  updateCarousel(currentIndex+1);
});


function carouselTimeout() {
  updateCarousel(currentIndex+1);

  setTimeout(carouselTimeout, 3000);
}

setTimeout(carouselTimeout, 3000);





const imageDiv = document.getElementById('autoscroller');
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

