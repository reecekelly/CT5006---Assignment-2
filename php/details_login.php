<?php
	/**
	*	THIS FILE MUST BE REMOVED FROM FINAL BUILD
	*/
	//stores the server location
	$servername 	= "ct5006-14n.studentsites.glos.ac.uk";
	//stores the users user name
	$username 		= "s1304388_testie";
	//stores the users password
	$password 		= "Keyboard12345";
	//stores the databases name
	$dbname 		= "s1304388_testagain";
	//Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);

	//Check connection
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	} 
?>