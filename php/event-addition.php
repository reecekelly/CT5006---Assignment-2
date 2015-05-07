<?php

	include 'details_login.php';

	$i 					= "0";
	$post_data_event	= array();

	$sql = "SELECT * FROM `APP_EVENT_TABLE`";
	$result = $conn->query($sql);

	if ($result->num_rows > 0) {
		// output data of each row
		while($row = $result->fetch_assoc()) {
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
		
		echo json_encode($post_data_event);
		
	} else {
		echo "0 results";
	}

	$conn->close();	
	
?>