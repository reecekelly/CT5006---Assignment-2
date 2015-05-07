// Required for two separate functions
var map;
var userlat;
var userlng;
var point;
var markerstore = [];				
					
var directionsDisplay;

var lightboxstate = false;
			
/*
* Starts the google map api implementation if there is an internet connection.
* Requires users current position, along with destination.
*/	
function loadMap() {
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(initialize);
	}
}

/*
* This finds the users current gps location and parses it to the calcRoute function.
*/
function initialize(position) {
	userlat = position.coords.latitude;
	userlng = position.coords.longitude;
				
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

/*
* Moves the centre of the map back to the user
*/
function centreMap() {
	var latLng = new google.maps.LatLng(userlat, userlng);
	map.panTo(latLng);
}

function createUser() {
	var marker = new google.maps.Marker({
		map: map,
		animation: google.maps.Animation.DROP,
		position: {lat: userlat, lng: userlng}
	});	
}

/*
* Creates a marker and information window based on location
* @param markerlng the markers lat
* @param markerlng the markers lng
*/	
function createMarker(name, description, post, phone, lat, lng, position) {
	var marker = new google.maps.Marker({
		map: map,
		animation: google.maps.Animation.DROP,
		position: {lat: lat, lng: lng},
		icon: "alpha.ico"
	});	
	
	var contentinfo = '<h1>'+name+'</h1> </br>'+'<p>'+description+'</p> </br>'+'<p>'+post+'	'+phone+'</p> </br>'+'<p>Marker Location:'+marker.getPosition()+ '</p>'+'<button data-marker='+'"'+position+'"'+' data-method="WALKING" class="directions">Walk</button>'+'<button data-marker='+'"'+position+'"'+' data-method="BICYCLING" class="directions">Bicycling</button>'+'<button data-marker='+'"'+position+'"'+' data-method="DRIVING" class="directions">Driving</button>'+'<button data-marker='+'"'+position+'"'+' data-method="TRANSIT" class="directions">Transit</button>';
	
	var infowindow = new google.maps.InfoWindow({
		content: contentinfo
	});
	
	markerstore[position] = marker;
	
	google.maps.event.addListener(marker, 'click', function() {
		infowindow.open(map, marker);
	});

}

/*
* Sets the users destination, mode of transportation, checks if they are available
* @param point - The users current gps position (Lat and Lng)
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

function setAllMap(map) {
	for (var i = 0; i < markerstore.length; i++) {
		markerstore[i].setMap(map);
	}
}

function clearMarkers() {
	setAllMap(null);
}

function reformMarkers() {
	setAllMap(map);
}

function createEvent(name, description, picture, location, link, cost, date, telephone) {
	var eventslot = document.createElement("event-holder");
	var eventh2 = document.createElement("h2");
	eventslot.appendChild(eventh2);
	
	var eventspan = document.createElement("span");
    var t = document.createTextNode(name);	
	eventh2.appendChild(t);
	
	document.main.appendChild(eventslot);
}