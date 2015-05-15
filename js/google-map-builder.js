//stores the Google map.
var map;
//stores the current latitude of the user.
var userlat;
//stores the current longitude of the user.
var userlng;
//stores the current position of the user (lat, lng)
var point;
//stores all map markers
var markerstore = [];				
//stores the directionsDisplay object used for plotting directions.				
var directionsDisplay;

/**
* Starts the google map api implementation if there is an internet connection.
* Requires users current position, along with destination.
*/	
function loadMap() {
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(initialize);
	}
}

/**
* initialize - This finds the users current gps location and parses it to the calcRoute function.
* @param position the current location of the device.
*/
function initialize(position) {
	userlat = position.coords.latitude;
	userlng = position.coords.longitude;
	geocoder = new google.maps.Geocoder(); 			
				
	directionsDisplay = new google.maps.DirectionsRenderer();
	
	point = new google.maps.LatLng(userlat, userlng);
	
	var mapOptions = {
		zoom: 14, 
		center: point, 
		disableDefaultUI: true
	};
	
	map = new google.maps.Map(document.getElementById('map-div'), mapOptions);
	map.setTilt(45);
	directionsDisplay.setMap(map);
	
	createUser();
	markerReceive();
}

/**
* centreMap - Moves the centre of the map back to the user.
*/
function centreMap() {
	var latLng = new google.maps.LatLng(userlat, userlng);
	map.panTo(latLng);
}

/**
* createUser - Plots on the Google map the current position of the user (lat, lng).
*/
function createUser() {
	var marker = new google.maps.Marker({
		map: map,
		animation: google.maps.Animation.DROP,
		position: {lat: userlat, lng: userlng},
		icon: "images/icon-location_32x32.png"
	});	
}

/**
* Creates a marker and information window based on location
* @param markerlng the markers lat
* @param markerlng the markers lng
*/	
function createMarker(name, description, post, phone, lat, lng, position) {
	var marker = new google.maps.Marker({
		map: map,
		animation: google.maps.Animation.DROP,
		position: {lat: lat, lng: lng},
		icon: "images/star-icon_32x32.png"
	});	
	
	var contentinfo = '<h1>'+name+'</h1> </br>'+'<p>'+description+'</p> </br>'+'<p>'+post+'</p> </br>'+'<button data-marker='+'"'+position+'"'+' data-method="WALKING" class="directions">Walk</button>'+'<button data-marker='+'"'+position+'"'+' data-method="BICYCLING" class="directions">Bicycling</button>'+'<button data-marker='+'"'+position+'"'+' data-method="DRIVING" class="directions">Driving</button>'+'<button data-marker='+'"'+position+'"'+' data-method="TRANSIT" class="directions">Transit</button>';
	
	var infowindow = new google.maps.InfoWindow({
		content: contentinfo
	});
	
	markerstore[position] = marker;
	
	google.maps.event.addListener(marker, 'click', function() {
		infowindow.open(map, marker);
	});

}

/**
*	codeAddress - Converts the entered value in the maps search bar into an interactive marker.
*/
function codeAddress() {
    var address = document.getElementById("address").value;

//geocoder
    geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
			map.setCenter(results[0].geometry.location);
			
		var marker = new google.maps.Marker({
			map: map,
			animation: google.maps.Animation.DROP,
			position: results[0].geometry.location
		});	
	
	var nextvalue = markerstore.length + 1;
	var contentinfo = '<button data-marker='+'"'+nextvalue+'"'+' data-method="WALKING" class="directions">Walk</button>'+'<button data-marker='+'"'+nextvalue+'"'+' data-method="BICYCLING" class="directions">Bicycling</button>'+'<button data-marker='+'"'+nextvalue+'"'+' data-method="DRIVING" class="directions">Driving</button>'+'<button data-marker='+'"'+nextvalue+'"'+' data-method="TRANSIT" class="directions">Transit</button>';
	
	var infowindow = new google.maps.InfoWindow({
		content: contentinfo
	});

	markerstore[nextvalue] = marker;
	
	google.maps.event.addListener(marker, 'click', function() {
		infowindow.open(map, marker);
	});
		} else {
			alert("Geocode was not successful for the following reason: " + status);
		}	
	});
}

/**
* calcRoute - Finds the appropriate path between two selected points on a Google map.
* @param point - The starting point.
* @param destination - The the chosen destination of the user.
* @param selectedMode - The method of transport.
*/
function calcRoute(point, destination, selectedMode) {
	var directionsService = new google.maps.DirectionsService();
	
	var request = {
		origin: point, 
		destination: destination, 
		unitSystem: google.maps.UnitSystem.IMPERIAL, 
		travelMode: google.maps.TravelMode[selectedMode]
	};
		
	directionsService.route(request, function(response, status) {
		if (status == google.maps.DirectionsStatus.OK) {
			directionsDisplay.setDirections(response);
		}
	});
}

/**
* setAllMap - Populates the map with the stored markers.
* @param map - The targeted Google map object.
*/
function setAllMap(map) {
	for (var i = 0; i < markerstore.length; i++) {
		markerstore[i].setMap(map);
	}
}

/**
* clearMarkers - 
*/
function clearMarkers() {
	setAllMap(null);
	
}

/**
* reformMarkers - 
*/
function reformMarkers() {
	setAllMap(map);
}

