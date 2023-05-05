# daily-planner


## User Story

AS AN employee with a busy schedule
I WANT to add important events to a daily planner
SO THAT I can manage my time effectively

## Acceptance Criteria

GIVEN I am using a daily planner to create a schedule
WHEN I open the planner
THEN the current day is displayed at the top of the calendar
WHEN I scroll down
THEN I am presented with timeblocks for standard business hours
WHEN I view the timeblocks for that day
THEN each timeblock is color coded to indicate whether it is in the past, present, or future
WHEN I click into a timeblock
THEN I can enter an event
WHEN I click the save button for that timeblock
THEN the text for that event is saved in local storage
WHEN I refresh the page
THEN the saved events persist


## Solution

Steps to resolve the Challenge:

Examine the starter code for the available style in the css file.

Use moment.js to get and format the current date and display on the header.

Based on the current styles in css file, build a sample time-block with responsive design by bootstrap framework in the html file.

Convert the time-block built in html by dynamically generating the elements using jQuery.

Add delegated event listerners to the save buttons of each row in the time-block.

Add save event function to save the user input to the local storage.

Add coding to retrieve the saved events when rendering the time-block.

Add validations and checkings to the program to avoid wrong user inputs and operations causing errors to the program.

## Installation

No Installation requried.

## License

Not Applicable
