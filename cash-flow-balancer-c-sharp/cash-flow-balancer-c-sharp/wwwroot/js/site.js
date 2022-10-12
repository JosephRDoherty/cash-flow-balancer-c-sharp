// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// The greatest function of all time
// saves 20 keystrokes and makes the code way easier to read
// honestly who on earth thought document.getElementById was a good idea????
function getID(id) {
    return document.getElementById(id);
}









//Does extremely complicated math
function addCalc() {
    const num1 = getID("num1").value;
    const num2 = getID("num2").value;
    let sum = Number(num1) + Number(num2);
    getID("answer").innerHTML = sum;
}

// Shows the mobile tab panel
function showTabPanel() {

    if (getID("tabPanel").style.display !== "none") {
        getID("tabPanel").style.display = "none";
        getID("hamButton").classList.remove("hamButtonOn");
    } else {
        getID("tabPanel").style.display = "flex";
        getID("hamButton").classList.add("hamButtonOn");
    }

}



// Toggles the visibility of the div
function showDiv(divID, displayType, tabToChange) {
    // check if the tab is hidden
    if (getID(divID).style.display !== "none") {

        // hide tab
        getID(divID).style.display = "none";

        // Change the look of the tab
        getID(tabToChange).classList.remove("tabActive");
        getID(tabToChange).classList.add("tabButton");
    } else {
        // hide tab
        getID(divID).style.display = displayType;

        // Change the look of the tab
        getID(tabToChange).classList.add("tabActive");
        getID(tabToChange).classList.remove("tabButton");
    }

}