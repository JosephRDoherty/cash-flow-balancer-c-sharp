// Imported by cashFlowController.js (or at least it will be when I can make an import actually WORK)
'use strict';
// This file should do the calculations that get sent to and from the controller.
// Essentially this file will provide a number of functions to be called by the controller.
//


// Date Initializing stuff
// I don't know if I'll ever use this Month-name array, but the minute I delete it I'll wish I had it.
const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const today = new Date();
const nextMonth = toDate(today.getFullYear, today.getMonth + 1, today.getDate);
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
// maybe eventually keep track of the initial payday somewhere else, and set checkpoints,
// so that in a year the program doesn't have to calculate an entire year's worth of paydays just to get to today.
// or I can just change the initial payday manually in the code if and when it starts to get slow.


const paycheckCalendar = [];

// THIS BROKE SOME THINGS
const payDay1 = nearestPayday(); 
const payDay2 = nextPaycheck();

// Very complicated math to calculate how much money we get on payday
const totalIncome = joePay + elizaPay;
const monthlyIncome = incomeThisMonth(today.getMonth(), today.getFullYear());





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

// initialize arrays for each pay fortnight
const billListFortnight1 = payPeriodCalc(nearestPayday(), nextPaycheck());
const billListFortnight2 = payPeriodCalc(nextPaycheck(1), nextPaycheck(2));
const billListFortnight3 = payPeriodCalc(nextPaycheck(2), nextPaycheck(3));
const billListFortnight4 = payPeriodCalc(nextPaycheck(3), nextPaycheck(4));


// call functions to calculate expenses
const fortnight1Expenses = amountDueFortnightCalc(billListFortnight1);
const fortnight2Expenses = amountDueFortnightCalc(billListFortnight2);
const fortnight3Expenses = amountDueFortnightCalc(billListFortnight3);
const fortnight4Expenses = amountDueFortnightCalc(billListFortnight4);
const monthlyExpenses = amountDueFortnightCalc(billList);
const monthlyProfit = findProfit(monthlyIncome, monthlyExpenses);



// =====================================================================
//                             Functions
// =====================================================================


// Rework all this code involving fortnight1 and fortnight2
// It was a temporary thing, and these should all be using the date functions below


function payPeriodCalc(startDate, endDate){
    let billArray = [];
    for(let i=0; i<billList.length; i++){

        // Compare this month and next month
        if((numToDate(billList[i].dueDate, endDate) >= startDate || numToDate(billList[i].dueDate, startDate) >= startDate) && numToDate(billList[i].dueDate, endDate) <= endDate){
            billArray.push(billList[i]);
        }
    }
    return billArray;
}


function amountDueFortnightCalc(billArray){
    let amountDue = 0;
    for(let i=0; i<billArray.length; i++){
        amountDue += billArray[i].amount;
    }
    return amountDue;
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


function findProfit(income = totalIncome, expenses = monthlyExpenses){
    // Finds how much money remains after expences
    // defaults to totalIncome and monthlyExpenses for ease of use, but I'm adding this for future functionality
    let profit = income - expenses;
    return profit;
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
    return subtractDays(nextPaycheck(), today.getDate()).getDate();
}


function nearestPayday(endDate = today, startDate = initialPayday){
    // Calculates the nearest Payday before the endDate
    // I think this can be simplified even further using modulo, but for now it works
    let daysTilPayday = daysTilNearestPayday(endDate, startDate);
    return addDays(startDate, daysTilPayday);
}


function nextPaycheck(multiplier = 1, previousPayday = nearestPayday()){
    // returns a date
    // to find the paycheck after next, enter 2 as the multiplier.
    let nextPaycheck = addDays(previousPayday, (daysBetweenPaydays * multiplier));
    return nextPaycheck;
}


function paydayCalendar(startDate = initialPayday, endDate = today){
    // Create an array of paydays, create a search bar type thing on the site that uses this function

}

function incomeThisMonth(month = today.getMonth(), year = today.getFullYear()){
    // Look at how many paychecks are coming this month, and then multiply that by typical fortnight income
    let startDate = toDate(year, month, 1);
    let endDate = toDate(year, month + 1, 0);
    let howManyPaychecks = 2;
    let firstPaycheck = nearestPayday(startDate);

    if(firstPaycheck.getMonth() !== startDate.getMonth()){
        firstPaycheck = addDays(firstPaycheck, daysBetweenPaydays);
    }

    let thirdCheck = nextPaycheck(2, firstPaycheck)

    if(thirdCheck.getMonth() === startDate.getMonth()){
        // detects magic months, where we get 3 paychecks
        // I'd like to alert the user of an upcoming magic month eventually
        howManyPaychecks += 1;
    }

    return totalIncome * howManyPaychecks;
    
}




// =====================================================================
//                           CASH FLOW BALANCER FUNCTIONS
// =====================================================================

// The big boy functions. The functions to end all functions. Everything has been leading to this. It's time to fulfill your destiny....

function cashFlowBalancer(){
    // Look for imbalances, and add a "savings" bill to the previous fortnight, if there's room in the budget for it
    

}

function fortnightBudget(){
    // Calculates the amount of money we need to save for bills
    let profitPercent = findPercent(monthlyIncome, monthlyExpenses);
    let fortnightCost = findValueOfPercent(totalIncome, profitPercent);
    return Math.ceil(fortnightCost);
}




// =====================================================================
//                           CONTROLLER
// =====================================================================

// Thanks javascript for being terrible and making this not DRY. the same code is in site.js.
function getID(id){
    // Make this suck less
    return document.getElementById(id);
}

// Stats
const HTMLtoday = getID('today');
HTMLtoday.innerHTML = today.toDateString();


const HTMLfortnightBudget = getID('fortnightBudget');
HTMLfortnightBudget.innerHTML = fortnightBudget();


const HTMLmonthlyIncome = getID('monthlyIncome');
HTMLmonthlyIncome.innerHTML = monthlyIncome;


const HTMLtotalIncome = getID('totalIncome');
HTMLtotalIncome.innerHTML = totalIncome;


const HTMLmonthlyProfit = getID('monthlyProfit');
HTMLmonthlyProfit.innerHTML = monthlyProfit;


const HTMLmonthlyExpenses = getID('monthlyExpenses');
HTMLmonthlyExpenses.innerHTML = monthlyExpenses;


const HTMLcurrentFortnight = getID('currentFortnight');
HTMLcurrentFortnight.innerHTML = nearestPayday().toDateString();


const HTMLfortnight1Expenses = getID('fortnight1Expenses');
HTMLfortnight1Expenses.innerHTML = fortnight1Expenses;


const HTMLdaysRemaining = getID('daysRemaining');
HTMLdaysRemaining.innerHTML = daysTilNextPayday();


const HTMLnextPaycheck = getID('nextPaycheck');
HTMLnextPaycheck.innerHTML = nextPaycheck().toDateString();


const HTMLfortnight2Expenses = getID('fortnight2Expenses');
HTMLfortnight2Expenses.innerHTML = fortnight2Expenses;




// Options
// Fortnight 1
const HTMLbillsDueNow = getID("billsDueNow");
HTMLbillsDueNow.addEventListener("click", function(){showDiv("billsDueNowDropDown", "flex")});
const HTMLbillsDueNowDropDown = getID("billsDueNowDropDown");
const HTMLfortnight1Cost = getID("fortnight1Cost");
HTMLfortnight1Cost.innerHTML = fortnight1Expenses;
HTMLbillsDueNowDropDown.innerHTML = printBillArray(billListFortnight1);

// Fortnight 2
const HTMLbillsDueNext = getID("billsDueNext");
HTMLbillsDueNext.addEventListener("click", function(){showDiv("billsDueNextDropDown", "flex")});
const HTMLbillsDueNextDropDown = getID("billsDueNextDropDown");
const HTMLfortnight2Cost = getID("fortnight2Cost");
HTMLfortnight2Cost.innerHTML = fortnight2Expenses;
HTMLbillsDueNextDropDown.innerHTML = printBillArray(billListFortnight2);

// Fortnight 3
const HTMLbillsDueFortnight3 = getID("billsDueFortnight3");
HTMLbillsDueFortnight3.addEventListener("click", function(){showDiv("billsDueFortnight3DropDown", "flex")});
const HTMLbillsDueFortnight3DropDown = getID("billsDueFortnight3DropDown");
const HTMLfortnight3Cost = getID("fortnight3Cost");
HTMLfortnight3Cost.innerHTML = fortnight3Expenses;
HTMLbillsDueFortnight3DropDown.innerHTML = printBillArray(billListFortnight3);

// Fortnight 4
const HTMLbillsDueFortnight4 = getID("billsDueFortnight4");
HTMLbillsDueFortnight4.addEventListener("click", function(){showDiv("billsDueFortnight4DropDown", "flex")});
const HTMLbillsDueFortnight4DropDown = getID("billsDueFortnight4DropDown");
const HTMLfortnight4Cost = getID("fortnight4Cost");
HTMLfortnight4Cost.innerHTML = fortnight4Expenses;
HTMLbillsDueFortnight4DropDown.innerHTML = printBillArray(billListFortnight4);

// All Bills
const HTMLbillsList = getID("billList");
HTMLbillsList.addEventListener("click", function(){showDiv("allBillsDropDown", "flex")});
const HTMLallBillsDropDown = getID("allBillsDropDown");
HTMLallBillsDropDown.innerHTML = printBillArray(billList);


document.getElementById("secretButton").addEventListener("click", function() {
    document.getElementById("secretButton").innerHTML = "Greetings";
    console.log("got here");
});

getID("secretButton").addEventListener("click", greetings);

function greetings(){
    getID("secretButton").innerHTML = "Greetings"
    console.log("Greetings");
}
