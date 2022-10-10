// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

//Does math
function addCalc() {
    const num1 = document.getElementById("num1").value;
    const num2 = document.getElementById("num2").value;
    //const answer = document.getElementById("answer").innerHTML;
    let sum = Number(num1) + Number(num2);
    document.getElementById("answer").innerHTML = sum;
}

// Search through all of the tab boxes, do something to them
function changeTabs() {

}

var isTabOpen = false;
// Toggles the visibility of the div
function showDiv(divClass, displayType) {

    if (document.getElementById(divClass).style.display !== "none") {
        document.getElementById(divClass).style.display = "none";
        var isTabOpen = false;
    } else {
        document.getElementById(divClass).style.display = displayType;
        isTabOpen = true;
    }

}