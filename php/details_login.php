<?php
	$servername 	= "ct5006-14n.studentsites.glos.ac.uk";
	$username 		= "s1304388_testie";
	$password 		= "Keyboard12345";
	$dbname 		= "s1304388_testagain";
	
	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);

	// Check connection
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	} 
?>