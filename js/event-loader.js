var eventlink = "http://ct5006-14n.studentsites.glos.ac.uk/php/event-addition.php";

function loadEvents() {

	$.ajax({
		url : eventlink,
		type : "POST",
		success: function( data ){ 
			var eventobject = JSON.parse(data);	

			var startpoint = document.getElementById("news");
					
			for(var i=0; i<eventobject.length; i++) {
				
				var event = eventobject[i].event_location;
				var newsreel = document.createElement("li");
				$(newsreel).html("<a href='#' onclick='var ref=window.open('https://plus.google.com/103500992688270718512/posts', '_blank', 'location=yes')' rel='external'>" +
									"<li class='event-holder'>" +
										'<img src="data:image/png;base64,' + event.event_picture + '" />'+
										"<h2>" +
											"<span>"+event.event_name+"</span>" +
											"<span class='second'>"+event.event_date+"</span>" +
										"</h2>" +
									"</li>" +
								"</a>");
						
				startpoint.appendChild(newsreel);
			}
			
		},
		error: function( data ){ 
			console.log("No Event Load"); 
		}
	});
	
}