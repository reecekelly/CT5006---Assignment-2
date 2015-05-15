/**
*	onLoad - combines multiple on load event listeners into a single function.
*/
function onLoad() {
	document.addEventListener("deviceready", onDeviceReady, false);
	document.addEventListener("online", onOnline, false);
	document.addEventListener("offline", onOffline, false);
}

/**
*	On load of the application certain conditions for the note taking system are initialized.
*	Loads events for the events feed on the homepage.
*/		
window.onload = function() {

	var headerheight = $(header).height();
	
	$("#map-div").css('height', screen.height - (headerheight*2));

	
	loadEvents();
	
	// Click handler used to add a note whenever the 
	// Submit button is clicked.
	var submitButton = document.getElementById("submit");
	submitButton.onclick = createNote;
	  
	// Check for localStorage capabilities 
	if (!window.localStorage) {
		// If localStorage is unavailable, warn user.  
		alert("Local storage not supported");
	} else {
		// If localStorage is available, display notes.  
		loadNotes();
	}
		
	// Click handler used to remove notes
	var deleteNotesButton = document.getElementById("delete-notes");
	deleteNotesButton.onclick = deleteNotes;
	
}

//listens to check if application is offline - uses network api
document.addEventListener("offline", onOffline, false);

/**
*	onOffline - Alerts the user to application being offline.
*/
function onOffline() {
	navigator.vibrate(1000);
    alert("Your device is no longer connected to the internet, please reconnect to use all of the applications features.");
}

/**
*	onBatteryStatus - Alerts user to current battery percentage.
*	@param info - The current battery percentage.
*/
function onBatteryStatus(info) {
    // Handle the online event
    alert("Level: " + info.level + " isPlugged: " + info.isPlugged);
}

/**
*	onClick function detects if a button attached to the map markers info boxes.
*	Creates a route between the point and marker.
* 	Remove extra markers from map.
*/					
$(document).on('click', '.directions', function() {
	calcRoute(point, markerstore[this.dataset.marker].getPosition(), this.dataset.method);
	clearMarkers();
	$( "#map-navigation-return" ).toggle();
});

/**
*	onClick function detects if the return button on the map page is clicked.
*	Returns the map display to starting state (removed route, adds markers back).
*/			
$(document).on('click', '#map-navigation-return', function() {
	$( "#map-navigation-return" ).toggle();
	clearMarkers();
	directionsDisplay.setMap();
	reformMarkers();
});

/**
*	onClick function detects if the map button in the navigation menu has been clicked.
*	Loads map api.
*/
$(document).on('click', '.iconlocation', function() {
	loadMap();
});

/**
*	inAppBrowser - Loads the inAppBrowser api with the desired url.
*	@param url - The destination website.
*/
function inAppBrowser(url) {
	navigator.vibrate(1000);
	var ref=window.open(eventurl[url], '_blank', 'location=yes');
}

/**
*	vibrate - Uses the Vibration api to create vibrations.
*/
function vibrate() {
	navigator.notification.vibrate(1000);
}