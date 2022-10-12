// Imported by cashFlowController.js (or at least it will be when I can make an import actually WORK)
'use strict';
// This file should do the calculations that get sent to and from the controller.
// Essentially this file will provide a number of functions to be called by the controller.
// 

// income
var period1 = 2648;
var period2 = 1496;
var totalIncome = period1 + period2;
// expenses
var duePeriod1 = 1232;
var duePeriod2 = 2012;
var totalExpenses = duePeriod1 + duePeriod2;

//console.log(findPercent(totalIncome, totalExpenses));

// find x is what percent of y,
// percentOf is the typically larger number, percentage is the smaller number (the one that will evaluate to a percentage)
function findPercent(percentOf, percentage){
    let percentCost = (percentage / percentOf )*100;
    return percentCost;
}

// Finds how much money remains after expences
// defaults to totalIncome and totalExpenses for ease of use, but I'm adding this for future functionality
function findProfit(income = totalIncome, expenses = totalExpenses){
    let profit = income - expenses;
    return profit;
}

// Try to make the amount due to be the same percentage of income that period


function balancerPrototype(){

}








// cashFlowController.js
//
// Since javascript is terrible,
// I can't just IMPORT A JS FILE like you can in EVERY OTHER LANGUAGE without all sorts of complicated BS that I don't feel like doing right now
// So this is the beginning of cashFlowController.js, and I'll copy-paste this later when Javascript sucks less.
// Seriously though why is Javascript so terrible

console.log("Profit: $",findProfit(), findPercent(totalIncome, findProfit()), "%");

