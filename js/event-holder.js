function onLoad() {
	document.addEventListener("deviceready", onDeviceReady, false);
	document.addEventListener("online", onOnline, false);
	document.addEventListener("offline", onOffline, false);
}
		
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

function onReady() {
	alert(JSON.stringify(navigator.network.connection.type));
}

document.addEventListener("offline", onOffline, false);

function onOffline() {
	navigator.vibrate(1000);
    alert("Your device is no longer connected to the internet, please reconnect to use all of the applications features.");
}

function onBatteryStatus(info) {
    // Handle the online event
    console.log("Level: " + info.level + " isPlugged: " + info.isPlugged);
}
					
$(document).on('click', '.directions', function() {
	calcRoute(point, markerstore[this.dataset.marker].getPosition(), this.dataset.method);
	clearMarkers();
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

function inAppBrowser(url) {
	navigator.vibrate(1000);
	var ref=window.open(eventurl[url], '_blank', 'location=yes');
}

function vibrate() {
	navigator.notification.vibrate(1000);
}