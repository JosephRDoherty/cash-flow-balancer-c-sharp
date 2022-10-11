// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.


//Does math
function addCalc() {
    const num1 = document.getElementById("num1").value;
    const num2 = document.getElementById("num2").value;
    //const answer = document.getElementById("answer").innerHTML;
    let sum = Number(num1) + Number(num2);
    document.getElementById("answer").innerHTML = sum;
}

function showTabPanel() {
    //var tabPanel = document.getElementById("tabPanel");
    //console.log(tabPanel);

    if (document.getElementById("tabPanel").style.display !== "none") {
        document.getElementById("tabPanel").style.display = "none";
        document.getElementById("hamButton").classList.remove("hamButtonOn");
    } else {
        document.getElementById("tabPanel").style.display = "flex";
        document.getElementById("hamButton").classList.add("hamButtonOn");
    }

}



// Toggles the visibility of the div
function showDiv(divID, displayType, tabToChange) {
    // check if the tab is hidden
    if (document.getElementById(divID).style.display !== "none") {

        // hide tab
        document.getElementById(divID).style.display = "none";

        // Change the look of the tab
        document.getElementById(tabToChange).classList.remove("tabActive");
        document.getElementById(tabToChange).classList.add("tabButton");
    } else {
        // hide tab
        document.getElementById(divID).style.display = displayType;

        // Change the look of the tab
        document.getElementById(tabToChange).classList.add("tabActive");
        document.getElementById(tabToChange).classList.remove("tabButton");
    }

}