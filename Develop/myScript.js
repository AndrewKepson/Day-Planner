$(document).ready(function() {
    //Get current time from moment.js and display in the header
    var now = moment().format('MMMM Do YYYY');
    var nowHour12 = moment().format('h');
    var nowHour24 = moment().format('H');
    var $dateHeading = $('#currentDay');
    $dateHeading.text(now);
    var saveIcon = "";
    //Get stored todo items from ls and parse the JSON string to an object
    var storedPlans = JSON.parse(localStorage.getItem('storedPlans'));
 
    //If plans are retrieved from ls, update the plan array to it
    if (storedPlans !== null) {
        planTextArr = storedPlans;
    } else {
        //This should execute only the first time the app is loaded, unless ls is cleared
        planTextArr = new Array(9);
        planTextArr[4] = 'Tea with the Prime Minister';
    }
 
    //Set a variable to reference the planner element
    var plannerContainer = $('.container');
    //Clear any existing elements
    plannerContainer.empty();
    //We are going to build the calender in the script
    for (let hour = 9; hour <= 17; hour++) {
        var index = hour - 9;
        //Build rows
        var rowDiv = $('<div>');
        rowDiv.addClass('row');
        rowDiv.addClass('plannerRow');
        rowDiv.attr('hour-index', hour);
        //Build time box with the remainder of the row
        var col2TimeBox = $('<div>');
        col2TimeBox.addClass('col-md-2');
        //Create timebox element with time
        var timeBoxSpan = $('<span>');
        timeBoxSpan.attr('class', 'timeBox');
        //Format time display
        var displayHour = 0;
        var ampm = '';
        if (hour > 12) {
            displayHour = hour - 12;
            ampm = 'pm';
        } else {
            displayHour = hour;
            ampm = 'am';
        }
        //Put the time into the timebox
        timeBoxSpan.text(`${displayHour} ${ampm}`);
 
        //Append the timebox into the document
        rowDiv.append(col2TimeBox);
        col2TimeBox.append(timeBoxSpan);
        //End of time box portion of rows
        //Build input section of rows
        var dailyPlanSpan = $('<input>');
 
        dailyPlanSpan.attr('id', `input-${index}`);
        dailyPlanSpan.attr('hour-index', index);
        dailyPlanSpan.attr('type', 'text');
        dailyPlanSpan.attr('class', 'dailyPlan');
        //Access hour from the data array
        dailyPlanSpan.val( planTextArr[index] );
        //Create a column to control the width
        var inputDiv9Col = $('<div>');
        inputDiv9Col.addClass('col-md-9');
        //Add to the row
        rowDiv.append(inputDiv9Col);
        inputDiv9Col.append(dailyPlanSpan);
        //End of input section of rows
 
        
        //Build save button
        var saveButtonDiv = $('<div>');
        saveButtonDiv.addClass('col-md-1');
        var saveButton = $('<i>');
        saveButton.attr('id', `saveid-${index}`);
        saveButton.attr('save-id', index);
        saveButton.attr('class', 'far fa-save saveIcon');
        rowDiv.append(saveButtonDiv);
        saveButtonDiv.append(saveButton);
        //End of save button
        //Set the row container based on the current time
        updateRowColor(rowDiv, hour);
        plannerContainer.append(rowDiv);
    };
	//Trigger the row color updating
	//Thanks to gabepettus for help figuring this out
    function updateRowColor(hourRow, hour) {

        if (hour < nowHour24) {

            hourRow.css('background-color', 'lightgrey');
        } else if (hour > nowHour24) {

            hourRow.css('background-color', 'lightgreen');
        } else {

            hourRow.css('background-color', 'tomato');
        }
    }
    //Onclick to listen for clicks in the planner area
    $(document).on('click', function(event) {
        event.preventDefault();

        var $index = $(this).attr('save-id');
        var inputID = '#input-' + index;
        var inputValue = $(inputID).val();
 
        planTextArr[$index] = inputValue;
 
 
        $(`#saveid-${$index}`).removeClass('shadowPulse');
        localStorage.setItem('storedPlans', JSON.stringify(planTextArr));
    });
    //Change the color of the save button on change of input
    $(document).on('change', 'input', function(event) {
        event.preventDefault();

        var i = $(this).attr('hour-index');
 
        $(`#saveid-${i}`).addClass('shadowPulse');
	});
	//Create an array of inspirational quotes to pull from each day and place in the footer
	// var inspiration = [
	// 	'"What you get by achieving your goals is not as important as what you become by achieving your goals." - Zig Ziglar', ' "When you have a dream, you &apos; ve got to grab it and never let go. Carol Burnett" ',
	// ]
	// var footerQuote = $(".footer-text");

	// for (var i = 0, i < inspiration.length; i++) {
	// 	footerQuote.text(inspiration[i]);
	// }
});
