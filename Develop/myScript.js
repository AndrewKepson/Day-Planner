$(document).ready(function() {

    var test = false;

    //Get current time from moment.js and display in the header 
    var now = moment().format('MMMM Do YYYY');
    var $dateHeading = $('#currentDay');
    $dateHeading.text(now);

    //Get stored todo items from ls and parse the JSON string to an object
    var storedPlans = JSON.parse(localStorage.getItem("storedPlans"));
    if (test) { console.log(storedPlans); }

    //If plans are retrieved from ls, update the plan array to it
    if (storedPlans !== null) {
        planTextArr = storedPlans;
    } else {
        //This should execute only the first time the app is loaded, unless ls is cleared
        plainTextArr = new Array(9);
        plainTextArr[4] = "Tea with the Prime Minister"
    }

    if (test) { console.log("full array of plned text",planTextArr); }

    //Set a variable to reference the planner element
    var $plannerDiv = $('.container');
    //Clear any existing elements
    $plannerDiv.empty();

    if (test) { console.log("current time",nowHour12); }


});