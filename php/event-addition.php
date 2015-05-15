<?php
	/**
	*	THIS FILE MUST BE REMOVED FROM FINAL BUILD
	*/
	
	//connects to username and password file
	include 'details_login.php';
	//global increment value
	$i 					= "0";
	//stores  the complete events
	$post_data_event	= array();
	//selected mySQL table
	$sql = "SELECT * FROM `APP_EVENT_TABLE`";
	//creates the connection to the selected table
	$result = $conn->query($sql);

	if ($result->num_rows > 0) {
		// output data of each row
		while($row = $result->fetch_assoc()) {
			//creates a JSON like file format for the data.
			$post_data_event[$i] = [
				'event_location' => array(
					'event_id' 			=> $row["EVENT_ID"],
					'event_name' 		=> $row["EVENT_NAME"],
					'event_picture' 	=> base64_encode($row["EVENT_PICTURE"]),
					'event_location' 	=> $row["EVENT_LOCATION"],
					'event_link' 		=> $row["EVENT_LINK"],
					'event_date'		=> date("d-m-Y", strtotime($row["EVENT_DATE"]))
				)
			];
			
			$i = $i + 1;
			
		}
		//outputs the data in JSON format
		echo json_encode($post_data_event);
		
	} else {
		echo "0 results";
	}
	//finishes the PHP call
	$conn->close();	
	
?>