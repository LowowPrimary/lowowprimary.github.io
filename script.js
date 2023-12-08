/* REQUIREMENTS

https://forum.babylonjs.com/t/mesh-intersection-by-using-stencil-buffer/11174

DP:

GD:
Task 1:
	-Create an "About Me" Page by adding a new page
	-Insert a photo of you or some art you have made
	-Write a short paragraph about you and your abilities. You have not only taken this class but others as well and you also have personal interests and abilities outside of school. 
Task 2:
	-Post one project you've completed so far
	-Write 100 words about your work, process, what you've learned during the project
Task 3:
Task 4:
Task 5:
*/

// Initialization
var currentDiv = "main";
var pageSelector = document.getElementById("pageSelection")

const pageDivDict = {
    "main": "main",
    "a": "a",
    "b": "b",
    "c": "c",
    "aboutMe": "aboutMe"
};

// Create Page Options
for (const [k, v] of Object.entries(pageDivDict)) {
	let opt = document.createElement("option");
	
  	let optText = document.createTextNode(k);
	
	opt.appendChild(optText);
pageSelector.appendChild(opt);
	currentDiv = k;
    
    optDiv = document.getElementById(currentDiv);
	if (k != "main") {
        optDiv.style.display = "none";
    }
};



// Changing Pages
var pageSelection = document.getElementById("pageSelection");

pageSelection.addEventListener("change", function() {
    alert("s p");
	
	for (const [k, v] of Object.entries(pageDivDict)) {
		if (k == pageSelection.value) {
			document.getElementById(k).style.display = "flex";

		} else {
			document.getElementById(k).style.display = "none";
		}
	};
	
});


// Random Test Button with No Purpose
var button = document.getElementById("buttonTest");
button.addEventListener("click", function() {
        
	alert("c"); 
});


