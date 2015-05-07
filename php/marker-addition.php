<?php

	include 'details_login.php';

	$i 					= "0";
	$post_data_marker	= array();

	$sql = "SELECT * FROM `APP_CITY_LOCATIONS`";
	$result = $conn->query($sql);

	if ($result->num_rows > 0) {
		// output data of each row
		while($row = $result->fetch_assoc()) {
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
		
		echo json_encode($post_data_marker);
		
	} else {
		echo "0 results";
	}

	$conn->close();	
	
?>