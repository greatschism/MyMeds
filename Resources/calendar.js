function createCalendarReminder (sdate, klokke, name) {
	
	var stringDate = sdate.toString()
	
	var year = stringDate.slice(3)
	var month = stringDate.slice(1,3)
	var day = stringDate.slice(0,2)
	
	var klokkeslutt = klokke + 1
	
	
	var CALENDAR_TO_USE = 1;
	var calendar = Ti.Android.Calendar.getCalendarById(CALENDAR_TO_USE);
	
	// Create the event
	var eventBegins = new Date(year, month, day, klokke, 0, 0);
	var eventEnds = new Date(year, month, day, klokkeslutt, 0, 0);
	var details = {
	    title: 'Ta pilla di!',
	    description: name,
	    begin: eventBegins,
	    end: eventEnds,
	};
	
	var event = calendar.createEvent(details);
	
	var reminderDetails = {
	    minutes: 10,
	    method: Ti.Android.Calendar.METHOD_ALERT
	};
	event.createReminder(reminderDetails);
}

function deleteCalendarReminder () {
	var CALENDAR_TO_USE = 1;
	var calendar = Ti.Android.Calendar.getCalendarById(CALENDAR_TO_USE);
	
	var event = calendar.getCalendarById('test')
}