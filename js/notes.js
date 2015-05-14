// Create empty notes array
var notes = []; 

// Key to store and retrieve from local storage
var key = "takenotes";

function createNote() { 
    // Get content of note
    var noteText = document.getElementById("note");
	text = noteText.value;
    
    // Ensure that note text is not empty
    if (text == null || text == "" || text.length == 0) {
		alert("Please enter a note!");
		 return;
	}
    else{
		// Set note properties
		var note = {};
		note.text = text;
		notes.push(note);
    
		// Store our notes
		storeNotes();
    
		// Display note on page	
		addNoteToPage(note);	
	};
	location.href="#savednotes";
	$('#note').val('');
};

function eraseText() {
document.getElementById("newnote").value = "";
}


function addNoteToPage(note) { 
    // Determine where to place notes on page
    var notesUl = document.getElementById("notes");
	var li = document.createElement("li");
    
    // Add class name and attributes to notes
    li.className = "note";
	li.innerHTML = note.text;
    
	if (notesUl.childElementCount > 0) {
		notesUl.insertBefore(li, notesUl.firstChild);
	} else {
		notesUl.appendChild(li);
	}
}

function storeNotes() { 
    // Convert array of notes to string
    var jsonNotes = JSON.stringify(notes);
    // Store the note
	localStorage.setItem(key, jsonNotes);
}

function loadNotes() { 
    // Get notes
    var jsonNotes = localStorage.getItem(key);
    
	if (jsonNotes != null) {
		notes = JSON.parse(jsonNotes);
        
		for (var i = 0; i < notes.length; i++) {
			addNoteToPage(notes[i]);
		}
	}
}

 
function deleteNotes() { 
	var checkDel = confirm("Are you sure you want to delete all of your notes?");
	
	if (checkDel == true){
		// Remove all notes from local storage
		window.onbeforeunload = function() {
			localStorage.removeItem(key);
		};
		
		location.reload(true);
	}
	
	//Call confirmation	
	checkDel();
}
