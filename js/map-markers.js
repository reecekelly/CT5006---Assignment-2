var markerlink = "http://ct5006-14n.studentsites.glos.ac.uk/php/marker-addition.php";

function markerReceive(){

	$.ajax({
		url : markerlink,
		type : "POST",
		success: function( data ){ 
			var markerobject = JSON.parse(data);
			
			for(var i=0; i<markerobject.length; i++) {
				var destination = markerobject[i].marker_location;

				createMarker(
								destination.mark_name, 
								destination.mark_description, 
								destination.mark_postcode, 
								destination.mark_phone, 
								parseFloat(destination.mark_lat), 
								parseFloat(destination.mark_lng), 
								i
							);
			}
		},
		error: function( data ){ 
			console.log("No Marker Load"); 
		}
	});

}