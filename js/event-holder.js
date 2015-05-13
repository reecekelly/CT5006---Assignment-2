function onLoad() {
	document.addEventListener("deviceready", onDeviceReady, false);
	document.addEventListener("online", onOnline, false);
	document.addEventListener("offline", onOffline, false);
}
			
window.onload = function() {
	navigator.notification.beep(2);
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
		alert("You are using a web browser that is too old for this program. Please upgrade your web browser if you wish to get the full experience.");
	} else {
		// If localStorage is available, display notes.  
		loadNotes();
	}
		
	  // Click handler used to remove notes
	var deleteNotesButton = document.getElementById("delete-notes");
	deleteNotesButton.onclick = deleteNotes;
	
}
					
$(document).on('click', '.directions', function() {
	clearMarkers();
	calcRoute(point, markerstore[this.dataset.marker].getPosition(), this.dataset.method);
	$( "#map-navigation-return" ).toggle();
});
			
$(document).on('click', '#map-navigation-return', function() {
	$( "#map-navigation-return" ).toggle();
	clearMarkers();
	directionsDisplay.setMap();
	reformMarkers();
});

$(document).on('click', '.iconlocation', function() {
	loadMap();
});