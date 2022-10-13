// Imported by cashFlowController.js (or at least it will be when I can make an import actually WORK)
'use strict';
// This file should do the calculations that get sent to and from the controller.
// Essentially this file will provide a number of functions to be called by the controller.
//




// =====================================================================
//                               income
// =====================================================================
// This is somewhat temporary, I want to track all the paychecks as their own seperate objects in a database,
// but since paychecks are way more stable now, IDK if it's worth the trouble.
const joePay = 1205;
const elizaPay = 1113;


// These will need to be calculated on a bi-weekly basis.
// These can potentially get annoying and I might just make the user figure it out.
const payDay1 = 1; 
const payDay2 = 14;
const lastDayOfMonth = 28; // Eventually this will be generated based on the current month, for now this works
// Idea for above:
// Find the last day of the month, and then make a function that handles the overflow from 30-1 or 31-1 or 28-1
// Then add 14 from the payday to calculate the entire pay schedule without dealing with datetime nonsense


// Very complicated math to calculate how much money we get on payday
const period1 = joePay + elizaPay;
const period2 = joePay + elizaPay;
const totalIncome = period1 + period2;




// =====================================================================
//                            Bill class
// =====================================================================
class Bill {
    // Creates the bill class
    constructor (name, amount, dueDate) {
        this.name = name;
        this.amount = amount;
        this.dueDate = dueDate;

        this.init();
    };

    // pushes the bill to the billList array
    init = function() {
        billList.push(this)
    }
}




// =====================================================================
//                                    Bills stuff
// =====================================================================
// Array containing all bills
const billList = [];

// ---------------------------------------------------------------------------------------------------------------------------------
//                                                   Initialize bills here
// ---------------------------------------------------------------------------------------------------------------------------------
// Eventually this will be kept in a database, but for now this works.

let carPayment = new Bill("Car Payment", 333, 28);
let rent = new Bill("Rent", 1250, 12);
let phone = new Bill("Verizon", 115, 2);
let power = new Bill("Electricity", 100, 19);
let capitalOne = new Bill("Capital One", 25, 4);

sortByDueDate(billList);

// initialize arrays for each pay period
const billListPeriod1 = [];
const billListPeriod2 = [];

// call functions to calculate expenses
var period1Expenses = amountDuePeriodCalc(1);
var period2Expenses = amountDuePeriodCalc(2);
var totalExpenses = period1Expenses + period2Expenses;

// this is an object with idealCost information.
const idealCost = findIdealCost();




// =====================================================================
//                             Functions
// =====================================================================

function payPeriodCalc(period){
    // This creates the billListPeriod arrays.
    // These arrays only contain the bills due during the specific period
    // tell it what pay period you'd like to view, 1 or 2
    if(period === 1){
        for(let i=0; i<billList.length; i++){
            if(billList[i].dueDate >= payDay1 && billList[i].dueDate < payDay2){
                billListPeriod1.push(billList[i]);
            }
        }
        sortByDueDate(billListPeriod1);
    }
    else if(period === 2) {
        for(let i=0; i<billList.length; i++){
            if(billList[i].dueDate >= payDay2 && billList[i].dueDate <= lastDayOfMonth){
                billListPeriod2.push(billList[i]);
            }
        }
        sortByDueDate(billListPeriod2);
    } else {
        console.log("Please enter a valid pay period");
    }
}


function amountDuePeriodCalc(period) {
    // calculates the amound due during the respective pay period.
    // probably can be combined with payPeriodCalc() above, I'm kinda repeating myself here with these loops
    if(period === 1){
        let amountDue = 0;
        payPeriodCalc(1);
        for (let i=0; i<billListPeriod1.length; i++){
            amountDue += billListPeriod1[i].amount;
        }
        return amountDue;
    } else if (period === 2){
        let amountDue = 0;
        payPeriodCalc(2);
        for (let i=0; i<billListPeriod2.length; i++){
            amountDue += billListPeriod2[i].amount;
        }
        return amountDue;
    } else {
        console.log("Please enter a valid pay period");
    }

    
}


function findPercent(percentOf, percentage){
    // Find: "percentOf is what percent of percentage",
    // These names aren't the best but I can't think of better ones, so here's an explanation:
    // percentOf is the typically larger number, percentage is the smaller number (the one that will evaluate to a percentage)
    let percentCost = (percentage / percentOf)*100;
    return percentCost;
}


function findValueOfPercent(percentOf, percentage) {
    // Finds a percentage of a number, so percentage of percentOf
    // percentOf is the total number, percentage is the percentage you want to calculate
    return percentOf * (percentage / 100);
}


function findProfit(income = totalIncome, expenses = totalExpenses){
    // Finds how much money remains after expences
    // defaults to totalIncome and totalExpenses for ease of use, but I'm adding this for future functionality
    let profit = income - expenses;
    return profit;
}


function findIdealCost(){
    // This function finds the amount needed to pay with each pay period to make the bill cost the same percentage of the income each pay period
    // It finds the value of the percentage of each pay period, then converts that to dollars
    // essentially maintaining the same percentage amount remaining each pay period
    // You may notice this is currently just dividing by two, but that won't always be the case if paychecks fluctuate.

    let percentage = findPercent(totalIncome, totalExpenses);
    let period1Cost = findValueOfPercent(period1, percentage);
    let period2Cost = findValueOfPercent(period2, percentage);

    const idealCost = {
        percentCost: percentage,
        period1Ideal: period1Cost,
        period1Profit: findProfit(period1, period1Cost),
        period2Ideal: period2Cost,
        period2Profit: findProfit(period2, period2Cost)
    }
    return idealCost;
}

function printBillArray(array){
    // prints any bill array
    // for use mostly in HTML contexts 
    var str = "";
    array.forEach(obj => {
        // for (let key in obj) {
            str += obj.name;
            str += ": $";
            str += obj.amount;
            str += " Due: ";
            str += obj.dueDate
            str += " <br> "
        //}
    })
    return str;
}

function sortByDueDate(array){
    // Sorts a bill array by due date [DEFAULT SORT]
    function compareDueDate(a, b){
        return a.dueDate - b.dueDate;
    }

    array.sort(compareDueDate);
}




// =====================================================================
//                           CONTROLLER
// =====================================================================

// Thanks javascript for being terrible and making this not DRY. the same code is in site.js.
function getID(id){
    // Make this suck less
    return document.getElementById(id);
}

// Top Section
const HTMLcurrentPeriod = getID('currentPeriod');
const HTMLperiod1Expenses = getID('period1Expenses');
const HTMLdaysRemaining = getID('daysRemaining');
const HTMLnextPaycheck = getID('nextPaycheck');
const HTMLperiod2Expenses = getID('period2Expenses');


// Empty strings need functions to determine their values
HTMLcurrentPeriod.innerHTML = "";
HTMLperiod1Expenses.innerHTML = period1Expenses;
HTMLdaysRemaining.innerHTML = "";
HTMLnextPaycheck.innerHTML = "";
HTMLperiod2Expenses.innerHTML = period2Expenses;

// Options
const HTMLbillsDueNow = getID("billsDueNow");
HTMLbillsDueNow.addEventListener("click", function(){showDiv("billsDueNowDropDown", "flex")});
const HTMLbillsDueNowDropDown = getID("billsDueNowDropDown");
const HTMLbillsDueNext = getID("billsDueNext");
HTMLbillsDueNext.addEventListener("click", function(){showDiv("billsDueNextDropDown", "flex")});
const HTMLbillsDueNextDropDown = getID("billsDueNextDropDown");


HTMLbillsDueNowDropDown.innerHTML = printBillArray(billListPeriod1);
HTMLbillsDueNextDropDown.innerHTML = printBillArray(billListPeriod2);


document.getElementById("secretButton").addEventListener("click", function() {
    document.getElementById("secretButton").innerHTML = "Greetings";
    console.log("got here");
});

getID("secretButton").addEventListener("click", greetings);

function greetings(){
    getID("secretButton").innerHTML = "Greetings"
    console.log("Greetings");
}
