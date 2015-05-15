<?php
	/**
	*	THIS FILE MUST BE REMOVED FROM FINAL BUILD
	*/
	
	//connects to username and password file
	include 'details_login.php';
	//global increment value
	$i 					= "0";
	//stores  the complete markers
	$post_data_marker	= array();
	//selected mySQL table
	$sql = "SELECT * FROM `APP_CITY_LOCATIONS`";
	//creates the connection to the selected table
	$result = $conn->query($sql);

	if ($result->num_rows > 0) {
		// output data of each row
		while($row = $result->fetch_assoc()) {
			//creates a JSON like file format for the data.
			$post_data_marker[$i] = [
				'marker_location' => array(
					'mark_id' 			=> $row["LOC_ID"],
					'mark_name' 		=> $row["NAME"],
					'mark_description' 	=> $row["DESCRIPTION"],
					'mark_postcode' 	=> $row["POSTCODE"],
					'mark_lat' 			=> $row["LAT"],
					'mark_lng' 			=> $row["LNG"],
					'mark_phone'		=> $row["PHONENUMBER"],
					'mark_email'		=> $row["EMAIL"]
				)
			];
			
			$i = $i + 1;
			
		}
		//outputs the data in JSON format
		echo json_encode($post_data_marker);
		
	} else {
		echo "0 results";
	}
	//finishes the PHP call
	$conn->close();	
	
?>