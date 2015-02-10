/*
* Changes target div to fit device screen fully, taking to consideration a header.
* @param target - the intended to adjust in size
* @param excess - the possible extra content to consider (e.g. a header)
*/
function divAdjust(target, minusamount) {
	var newmapheight = screen.height - minusamount;
	$(target).css( "height", newmapheight );
}

/*
* Starts the google map api implementation if there is an internet connection.
* Requires users current position, along with destination.
*/	

	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(initialize);
	}


// Required for two separate functions
var directionsDisplay;

/*
* This finds the users current gps location and parses it to the calcRoute function.
*/
function initialize(position) {
	var map;
	directionsDisplay = new google.maps.DirectionsRenderer();
	var point = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	var mapOptions = {zoom: 50, center: point, disableDefaultUI: true};
	map = new google.maps.Map(document.getElementById('mapDiv'), mapOptions);
	directionsDisplay.setMap(map);
		  
	calcRoute(point);
}

/*
* Sets the users destination, mode of transportation, checks if they are available
* @param point - The users current gps position (Lat and Lng)
*/
function calcRoute(point) {
	var directionsService = new google.maps.DirectionsService();
	var request = {origin:point, destination:"GL502RH", travelMode: google.maps.TravelMode.WALKING};
	directionsService.route(request, function(response, status) {
		if (status == google.maps.DirectionsStatus.OK) {
			directionsDisplay.setDirections(response);
		}
	});
}