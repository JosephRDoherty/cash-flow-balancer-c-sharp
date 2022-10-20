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
const totalIncome = joePay + elizaPay;

const daysBetweenPaydays = 14;
// Remember months are zero-indexed, so -= 1 from month number
const initialPayday = new Date(2022, 9, 14);
// maybe eventually keep track of the initial payday somewhere else, and set checkpoints,
// so that in a year the program doesn't have to calculate an entire year's worth of paydays just to get to today.
// or I can just change the initial payday manually in the code if and when it starts to get slow.

// Base Pay before taxes:
const joeHourPay = 20;
const joeHoursPerWeek = 40;
const joeWeeksPerYear = 52;
const joeBasePayAnnual = joeHourPay*joeHoursPerWeek*joeWeeksPerYear;

const elizaHourPay = 18.69;
const elizaHoursPerWeek = 40;
const elizaWeeksPerYear = 49;
const elizaBasePayAnnual = elizaHourPay*elizaHoursPerWeek*elizaWeeksPerYear;

const yearlyGrossIncome = joeBasePayAnnual + elizaBasePayAnnual;
const yearlyNetIncome = totalIncome * 26;

const payDay1 = nearestPayday(); 
const payDay2 = nextPaycheck();

// Very complicated math to calculate how much money we get on payday
const monthlyIncome = incomeThisMonth(today.getMonth(), today.getFullYear());





// =====================================================================
//                            Bill class
// =====================================================================
class Bill {
    // Creates the bill class
    constructor (name, amount, dueDate, type=null) {
        this.name = name;
        this.amount = Math.ceil(amount);
        this.dueDate = dueDate;
        this.type = type;
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

let wellsFargo = new Bill("Wells Fargo Card", 37, 2, "Credit Card");
let elizaPayPal = new Bill("Elizabeth PayPal", 76, 2, "Credit Card");
let geico = new Bill("Joe's Car Insurance", 178.05, 2, "Insurance");
let spotify = new Bill("Spotify", 12.99, 4, "Streaming");
let capOne = new Bill("Capital One 1", 25, 4, "Credit Card");
let rentInsurance = new Bill("Renters Insurance", 14.42, 5, "Insurance");
let adobe = new Bill("Adobe", 29.99, 6, "Utility");
let rings = new Bill("Rings", 25, 8, "Credit Card");
let internet = new Bill("Ziply Internet", 53.19, 10, "Utility");
let washer = new Bill("Home Depot Card", 34, 11, "Credit Card");
let affirm1 = new Bill("Affirm 1", 22.62, 12, "Credit Card");
let rent = new Bill("Rent", 1250, 12, "Misc");
// let rent2 = new Bill("Rent", 625, 12, "Misc");
let capTwo = new Bill("Capital One 2", 25, 12, "Credit Card");
let affirm2 = new Bill("Affirm 2", 22.30, 13, "Credit Card");
let eCareCredit = new Bill("Elizabeth Care Credit", 29, 13, "Credit Card");
let destinyCard = new Bill("Destiny Card", 40, 13, "Credit Card");
let trash = new Bill("Trash", 34.72, 15, "Utility");
let chaseCard = new Bill("Chase Card", 40, 15, "Credit Card");
let jCareCredit = new Bill("Joe's Care Credit", 29, 16, "Credit Card");
let creditOne = new Bill("Credit One Card", 30, 16, "Credit Card");
let jPayPal = new Bill("Joe's PayPal", 65, 16, "Credit Card");
let jUpstart = new Bill("Joe's Upstart", 194.54, 17, "Credit Card");
let phoneBill = new Bill("Verizon", 115.05, 18, "Utility");
let fortivaCard = new Bill("Fortiva Card", 59, 18, "Credit Card");
let eUpstart = new Bill("Elizabeth's Upstart", 213.05, 19, "Credit Card");
let powerBill = new Bill("Power Bill", 100, 20, "Utility");
let googleDrive = new Bill("Google Drive", 9.99, 20, "Utility");
let disneyPlus = new Bill("Disney+", 7.99, 27, "Streaming");
let elizaGeico = new Bill("Elizabeth's Geico", 15, 27, "Insurance");
let xboxCard = new Bill("Xbox Card", 35, 28, "Credit Card");
let carPayment = new Bill("Car Payment", 332.79, 28, "Misc");
let backTaxes = new Bill("Back Taxes", 35, 28, "Credit Card");
let gas = new Bill("Gas", 120, "N/A", "Utility");
let food = new Bill("Food", 300, "N/A", "Misc");




sortByDueDate(billList);

// initialize arrays for each fortnight
const billListFortnight1 = payPeriodCalc(nearestPayday(), nextPaycheck());
const billListFortnight2 = payPeriodCalc(nextPaycheck(1), nextPaycheck(2));
const billListFortnight3 = payPeriodCalc(nextPaycheck(2), nextPaycheck(3));
const billListFortnight4 = payPeriodCalc(nextPaycheck(3), nextPaycheck(4));


// call functions to calculate expenses
const fortnight1Expenses = arrayCostCalc(billListFortnight1);
const fortnight2Expenses = arrayCostCalc(billListFortnight2);
const fortnight3Expenses = arrayCostCalc(billListFortnight3);
const fortnight4Expenses = arrayCostCalc(billListFortnight4);
const monthlyExpenses = arrayCostCalc(billList);
const monthlyProfit = findProfit(monthlyIncome, monthlyExpenses);

const yearlyCost = monthlyExpenses * 12;

const yearlyProfit = findProfit(yearlyNetIncome, yearlyCost);

const fortnight1Profit = findProfit(totalIncome, fortnight1Expenses);
const fortnight2Profit = findProfit(totalIncome, fortnight2Expenses);
const fortnight3Profit = findProfit(totalIncome, fortnight3Expenses);
const fortnight4Profit = findProfit(totalIncome, fortnight4Expenses);

const creditCardList = typeFinder();
const utilityList = typeFinder("Utility");
const streamingList = typeFinder("Streaming");
const insuranceList = typeFinder("Insurance");
const miscList = typeFinder("Misc");

const creditCardExpenses = arrayCostCalc(creditCardList);
const utilityEpenses = arrayCostCalc(utilityList);
const streamingExpenses = arrayCostCalc(streamingList);
const insuranceExpenses = arrayCostCalc(insuranceList);
const miscExpenses = arrayCostCalc(miscList);




// =====================================================================
//                             Functions
// =====================================================================


function payPeriodCalc(startDate, endDate){
    let billArray = [];
    for(let i=0; i<billList.length; i++){

        // If the date is during this month and fits within the date span, push it
        if(numToDate(billList[i].dueDate, startDate) >= startDate && numToDate(billList[i].dueDate, startDate) < endDate){
            billArray.push(billList[i]);
        // If the date is during NEXT month and fits within the date span, push it
        } else if(numToDate(billList[i].dueDate, endDate) >= startDate && numToDate(billList[i].dueDate, endDate) < endDate){
            billArray.push(billList[i]);
        }
    }
    return billArray;
}

function typeFinder(type="Credit Card", array=billList){
    let typeArray = [];
    for(let i=0; i<array.length; i++){
        if(billList[i].type === type){
            typeArray.push(array[i]);
        }
    }
    return typeArray;
}


function arrayCostCalc(billArray){
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
            str += "<p><strong>"
            str += obj.name;
            str += "</strong><br>"
            str += "$";
            str += obj.amount;
            str += " | Due: ";
            str += obj.dueDate
            str += "</p><hr>"
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
    // This option Finds the value of the profitPercent on totalIncome, the fortnightly income
    let fortnightCost = findValueOfPercent(totalIncome, profitPercent);
    // This option multiplies the entire yearly cost of bills, and then divides it evenly across all paychecks.
    // This may not work because of those magic months where we get an extra paycheck only happen twice a year.
    let yearlyCost = monthlyExpenses * 12;
    let fortnightCost2 = yearlyCost / 26;

    // Not sure which is better, fortnightCost or fortnightCost2. For now I'm using fortnightCost2,
    // but I have a feeling that once I get all the bills in here, it will reveal an issue with this method.
    // Until then, we will find out.

    return Math.ceil(fortnightCost2);
}




// =====================================================================
//                           CONTROLLER
// =====================================================================

// Thanks javascript for being terrible and making this not DRY. the same code is in site.js.
function getID(id){
    // Make this suck less
    return document.getElementById(id);
}

function swapTitle(title, area){;
    // designed to work with already-defined area variables, so no getID() here.
    
    // if the title area is the same, erase it
    if(area.innerHTML === title){
        area.innerHTML = "";
    } else {
        // otherwise, change it
        area.innerHTML = title;
    }
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

const HTMLthisFortnightProfit = getID('thisFortnightProfit');
HTMLthisFortnightProfit.innerHTML = fortnight1Profit;


const HTMLfortnight1Expenses = getID('fortnight1Expenses');
HTMLfortnight1Expenses.innerHTML = fortnight1Expenses;


const HTMLdaysRemaining = getID('daysRemaining');
HTMLdaysRemaining.innerHTML = daysTilNextPayday();


const HTMLnextPaycheck = getID('nextPaycheck');
HTMLnextPaycheck.innerHTML = nextPaycheck().toDateString();


const HTMLfortnight2Expenses = getID('fortnight2Expenses');
HTMLfortnight2Expenses.innerHTML = fortnight2Expenses;


//===================================================================================================================================================

// Information:
const HTMLactiveFortnight = getID("activeFortnight");
const HTMLfortnightInfo = getID("fortnightInfo");



// Fortnight 1
const HTMLbillsDueFortnight1 = getID("billsDueFortnight1");
HTMLbillsDueFortnight1.addEventListener("click", function(){showDiv("billsDueFortnight1DropDown", "grid", "billsDueFortnight1", null, "activeBtn", fortnightTabList)});
HTMLbillsDueFortnight1.addEventListener("click", function(){swapTitle("Fortnight 1 | ", HTMLactiveFortnight)});
HTMLbillsDueFortnight1.addEventListener("click", function(){swapTitle(nearestPayday().toDateString(), HTMLfortnightInfo)});
const HTMLbillsDueFortnight1DropDown = getID("billsDueFortnight1DropDown");
const HTMLfortnight1Cost = getID("fortnight1Cost");
HTMLfortnight1Cost.innerHTML = fortnight1Expenses;
HTMLbillsDueFortnight1DropDown.innerHTML = printBillArray(billListFortnight1);

// Fortnight 2
const HTMLbillsDueFortnight2 = getID("billsDueFortnight2");
HTMLbillsDueFortnight2.addEventListener("click", function(){showDiv("billsDueFortnight2DropDown", "grid", "billsDueFortnight2", null, "activeBtn", fortnightTabList)});
HTMLbillsDueFortnight2.addEventListener("click", function(){swapTitle("Fortnight 2 | ", HTMLactiveFortnight)});
HTMLbillsDueFortnight2.addEventListener("click", function(){swapTitle(nextPaycheck(1).toDateString(), HTMLfortnightInfo)});
const HTMLbillsDueFortnight2DropDown = getID("billsDueFortnight2DropDown");
const HTMLfortnight2Cost = getID("fortnight2Cost");
HTMLfortnight2Cost.innerHTML = fortnight2Expenses;
HTMLbillsDueFortnight2DropDown.innerHTML = printBillArray(billListFortnight2);

// Fortnight 3
const HTMLbillsDueFortnight3 = getID("billsDueFortnight3");
HTMLbillsDueFortnight3.addEventListener("click", function(){showDiv("billsDueFortnight3DropDown", "grid", "billsDueFortnight3", null, "activeBtn", fortnightTabList)});
HTMLbillsDueFortnight3.addEventListener("click", function(){swapTitle("Fortnight 3 | ", HTMLactiveFortnight)});
HTMLbillsDueFortnight3.addEventListener("click", function(){swapTitle(nextPaycheck(2).toDateString(), HTMLfortnightInfo)});
const HTMLbillsDueFortnight3DropDown = getID("billsDueFortnight3DropDown");
const HTMLfortnight3Cost = getID("fortnight3Cost");
HTMLfortnight3Cost.innerHTML = fortnight3Expenses;
HTMLbillsDueFortnight3DropDown.innerHTML = printBillArray(billListFortnight3);

// Fortnight 4
const HTMLbillsDueFortnight4 = getID("billsDueFortnight4");
HTMLbillsDueFortnight4.addEventListener("click", function(){showDiv("billsDueFortnight4DropDown", "grid", "billsDueFortnight4", null, "activeBtn", fortnightTabList)});
HTMLbillsDueFortnight4.addEventListener("click", function(){swapTitle("Fortnight 4 | ", HTMLactiveFortnight)});
HTMLbillsDueFortnight4.addEventListener("click", function(){swapTitle(nextPaycheck(3).toDateString(), HTMLfortnightInfo)});
const HTMLbillsDueFortnight4DropDown = getID("billsDueFortnight4DropDown");
const HTMLfortnight4Cost = getID("fortnight4Cost");
HTMLfortnight4Cost.innerHTML = fortnight4Expenses;
HTMLbillsDueFortnight4DropDown.innerHTML = printBillArray(billListFortnight4);

// All Bills
const HTMLbillsList = getID("billList");
HTMLbillsList.addEventListener("click", function(){showDiv("allBillsDropDown", "grid", "billList", null, "activeBtn", fortnightTabList)});
HTMLbillsList.addEventListener("click", function(){swapTitle("All Bills", HTMLactiveFortnight)});
HTMLbillsList.addEventListener("click", function(){swapTitle("", HTMLfortnightInfo)});
const HTMLallBillsDropDown = getID("allBillsDropDown");
HTMLallBillsDropDown.innerHTML = printBillArray(billList);

const fortnightTabList = [HTMLbillsDueFortnight1, HTMLbillsDueFortnight2, HTMLbillsDueFortnight3, HTMLbillsDueFortnight4,HTMLbillsList]

document.getElementById("secretButton").addEventListener("click", function() {
    document.getElementById("secretButton").innerHTML = "Greetings";
    console.log("got here");
});

getID("secretButton").addEventListener("click", greetings);

function greetings(){
    getID("secretButton").innerHTML = "Greetings"
    console.log("Greetings");
}
