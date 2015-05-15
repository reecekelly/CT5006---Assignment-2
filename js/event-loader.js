//stores the url link to the event PHP file
var eventlink = "http://ct5006-14n.studentsites.glos.ac.uk/php/event-addition.php";
//stores all of the events urls for inAppBrowser use
var eventurl = [];

/**
* loadEvents - Function hold the Ajax responsible for retrieving the data from the server side PHP file.
* 				Designed to build events for the homepage of the application.
*				Converts from JSON data.
*/
function loadEvents() {

	$.ajax({
		url : eventlink,
		type : "POST",
		success: function( data ){ 
			eventobject = JSON.parse(data);	
			var startpoint = document.getElementById("news");
					
			for(var i=0; i<eventobject.length; i++) {
					
				var event = eventobject[i].event_location;
				eventurl.push(event.event_link);

				var newsreel = document.createElement("li");
				$(newsreel).html('<a href="#" onClick="inAppBrowser('+ i +');" rel="external">' +
									'<li class="event-holder">' +
										"<img src='data:image/png;base64," + event.event_picture + "' />"+
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