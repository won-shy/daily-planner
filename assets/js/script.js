
var currentDateEl = $('#currentDay');
var currentDate = moment().format('dddd, MMMM Do YYYY');
var timeBlockEl = $('.time-block');
var messageEl = $('#message-bar');

currentDateEl.text(currentDate);

var eventList = new Array();

function initPage() {
    // gets the saved events from local storage and also renders the timeblock
    eventList = JSON.parse(localStorage.getItem("eventList"));

    renderTimeBlocks();
}

function renderTimeBlocks() {
    //resets the timeblock element
    timeBlockEl.empty();

    for (var i = 9; i <= 17; i++) {
        var sectionEl = $('<section>')

        // creates hour column
        sectionEl.addClass('row d-flex');
        sectionEl.attr('data-hour', i);
        timeBlockEl.append(sectionEl);

        var hourEl = $('<div>');
        hourEl.addClass('hour col-3 col-md-2 col-lg-1');
        var hourTextEl = $('<p>');
        hourTextEl.text(moment(i, 'HH').format("hA"));
        hourTextEl.attr('style', 'margin-top:40%');
        hourEl.append(hourTextEl);
        sectionEl.append(hourEl);

        // creates description column 
        var descEl = $('<textarea>');

        // populates the save event, if any
        if (eventList !== null) {
            for (var j = 0; j < eventList.length; j++) {
                if (eventList[j].date == moment().format('YYYYMMDD') &&
                    eventList[j].hour == i) {
                    descEl.text(eventList[j].desc);
                }
            }
        }

        // sets the background color based on the current time 
        if (moment().format('H') < i) {
            descEl.addClass('description future col-6 col-md-8 col-lg-10');
            descEl.attr('disabled', false);
            descEl.attr('style', 'color:blue');
        } else if (moment().format('H') == i) {
            descEl.addClass('description present col-6 col-md-8 col-lg-10');
            descEl.attr('disabled', false);
        } else {
            descEl.addClass('description past col-6 col-md-8 col-lg-10');
            descEl.attr('disabled', true);
            descEl.attr('style', 'color:black');
        }

        sectionEl.append(descEl);

        // creates the save button 
        var saveEl = $('<button>');
        saveEl.addClass('saveBtn col-3 col-md-2 col-lg-1');

        var iconEl = $('<i>');
        iconEl.addClass('fa fa-save');
        iconEl.attr('style', 'color:white');
        saveEl.append(iconEl);
        sectionEl.append(saveEl);
    }
}

function saveEvent(event) {
    var btnClicked = $(event.target);


    if (btnClicked.prop('localName') === 'button') {
        // gets values if button is targeted
        var eventItem = {
            hour: btnClicked.parent('section').data('hour'),
            desc: btnClicked.parent('section').children().eq(1).val().trim(),
            date: moment().format('YYYYMMDD')
        }
    } else {
        // gets values if the button icon is targeted
        var eventItem = {
            hour: btnClicked.parent('button').parent('section').data('hour'),
            desc: btnClicked.parent('button').parent('section').children().eq(1).val().trim(),
            date: moment().format('YYYYMMDD')
        }
    }

    // validates the input (won't save input if current time <)
    if (eventItem.hour < moment().format('H')) {
        displayMessage('Cannot save past event.');
        return;
    }

    if (eventItem.desc === '') {
        displayMessage('No input on the event description.')
        return;
    }

    if (eventList === null) {
        eventList = new Array();
        eventList.push(eventItem);
    } else {
        // removes any existing, overlapping events in local storage
        for (var i = 0; i < eventList.length; i++) {
            if (eventList[i].date == moment().format('YYYYMMDD') &&
                eventList[i].hour == eventItem.hour) {
                eventList.splice(i, 1);
                break;
            }
        }

        eventList.push(eventItem);
    }

    localStorage.setItem('eventList', JSON.stringify(eventList));
    displayMessage('Event Information is saved successfully.');

    renderTimeBlocks();
}

function displayMessage(strMessage) {
    messageEl.text(strMessage);
    messageEl.show();

    setTimeout(function () { messageEl.hide() }, 1500);
}

// delegates the event listener to the save buttons from the time block element
timeBlockEl.on('click', '.saveBtn', saveEvent);

initPage(); 

// TODO: Add a listener for click events on the save button. This code should
// use the id in the containing time-block as a key to save the user input in
// local storage. HINT: What does `this` reference in the click listener
// function? How can DOM traversal be used to get the "hour-x" id of the
// time-block containing the button that was clicked? How might the id be
// useful when saving the description in local storage?
//
// TODO: Add code to apply the past, present, or future class to each time
// block by comparing the id to the current hour. HINTS: How can the id
// attribute of each time-block be used to conditionally add or remove the
// past, present, and future classes? How can Day.js be used to get the
// current hour in 24-hour time?
//
// TODO: Add code to get any user input that was saved in localStorage and set
// the values of the corresponding textarea elements. HINT: How can the id
// attribute of each time-block be used to do this?
//
// TODO: Add code to display the current date in the header of the page.