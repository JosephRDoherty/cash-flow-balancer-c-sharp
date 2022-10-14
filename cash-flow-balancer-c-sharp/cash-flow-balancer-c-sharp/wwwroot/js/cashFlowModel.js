// Imported by cashFlowController.js (or at least it will be when I can make an import actually WORK)
'use strict';
// This file should do the calculations that get sent to and from the controller.
// Essentially this file will provide a number of functions to be called by the controller.
//


// Date Initializing stuff, to make the code work
const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const today = new Date();
let name = month[today.getMonth()];
const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);


// =====================================================================
//                               income
// =====================================================================
// This is somewhat temporary, I want to track all the paychecks as their own seperate objects in a database,
// but since paychecks are way more stable now, IDK if it's worth the trouble.
const joePay = 1205;
const elizaPay = 1113;

const daysBetweenPaydays = 14;
// Remember months are zero-indexed, so -= 1 from month number
const initialPayday = new Date(2022, 9, 14);
const lookAheadPaychecks = 4;

const paycheckCalendar = [];

// THIS BROKE SOME THINGS
const payDay1 = nearestPayday().getDate(); 
const payDay2 = nextPaycheck().getDate();

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
const period1Expenses = amountDuePeriodCalc(1);
const period2Expenses = amountDuePeriodCalc(2);
const totalExpenses = period1Expenses + period2Expenses;

// this is an object with idealCost information.
const idealCost = findIdealCost();




// =====================================================================
//                             Functions
// =====================================================================


// Rework all this code involving period1 and period2
// It was a temporary thing, and these should all be using the date functions below
// the periods could be defined using dates, perhaps
// That's a whole other can of worms.




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
            // numToDate works until it doesn't. It needs to handle the overflow into the next month, and I'm not sure how to do that.
            // currently numToDate(billList[0].dueDate) === Sun Oct 02 2022. It needs to also equal Nov 02 2022.
            // Ultimately I think both of these need to be refactored to accomodate the new time related functions that I worked so hard to make
            if(billList[i].dueDate >= payDay2 && numToDate(billList[i].dueDate) <= nextPaycheck(2)){
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
//                          Time Functions
// =====================================================================


function addDays(date, days) {
    // Returns a date
    // days should be an integer
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}


function subtractDays(date, days) {
    // Returns a date
    // days should be an integer
    var result = new Date(date);
    result.setDate(result.getDate() - days);
    return result;
}


function daySpan(newDate, oldDate){
    // Calculate how many days between 2 dates, returns an int
    // newDate is the latest date, oldDate is the oldest date
    let result = newDate.getTime() - oldDate.getTime();
    result = Math.round(result / (1000 * 60 * 60 * 24));
    return result

}


function paydayPredictor(interval = daysBetweenPaydays, fromPayday = initialPayday){
    // This function is redundant except for the defaults.
    // I don't want the generic addDays to have these defaults, so this makes it easy
    // I might delete this IDK yet
    var nextPayday = addDays(fromPayday, interval);

    return nextPayday;
}


// predict paydays starting from initial payday and up to a couple months ahead of today.
// maybe eventually keep track of the initial payday somewhere else, and set checkpoints,
// so that in a year the program doesn't have to calculate an entire year's worth of paydays just to get to today.
// or I can just change the initial payday manually in the code if and when it starts to get slow.

// find today
// add 4 paychecks to today
// calculate paydays starting from initial payday and up to the +4 paychecks date
// spit them out into an array

function numToDate(num, date = today){
    // Assumes you want the month and year to be the same as today
    var result = new Date(date);
    result.setDate(num);
    return result;
}


function toDate(year, month, day){
    var result = new Date(year, month, day);
    return result;
}


function howManyPaychecks(endDate = today, startDate = initialPayday){
    // Calculate how many paychecks between 2 dates
    let result = nearestPayday(endDate, startDate);
    result = result/daysBetweenPaydays;
    return result;
}


function daysTilNearestPayday(endDate = today, startDate = initialPayday){
    // Calculate how many days to the closest payday before endDate, returns an int
    // Probably can be eliminated
    let result = daySpan(endDate, startDate);
    result -= result%daysBetweenPaydays;
    return result;
}

function daysTilNextPayday(){
    return daysTilNearestPayday() + daysBetweenPaydays;
}


function nearestPayday(endDate = today, startDate = initialPayday){
    // Calculates the nearest Payday before the endDate
    // I think this can be simplified even further using modulo, but for now it works
    let daysTilPayday = daysTilNearestPayday(endDate, startDate);
    return addDays(initialPayday, daysTilPayday);
}

function nextPaycheck(multiplier = 1){
    // returns a date
    let previousPayday = nearestPayday();
    let nextPaycheck = addDays(previousPayday, (daysBetweenPaydays * multiplier));
    return nextPaycheck;
}


function paydayCalendar(lookAhead = lookAheadPaychecks, startDate = initialPayday, endDate = today){
    

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

HTMLcurrentPeriod.innerHTML = nearestPayday().toDateString();
HTMLperiod1Expenses.innerHTML = period1Expenses;
HTMLdaysRemaining.innerHTML = daysTilNextPayday();
HTMLnextPaycheck.innerHTML = nextPaycheck().toDateString();
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
