// Create empty notes array
var notes = []; 
// Key to store and retrieve from local storage
var key = "takenotes";

/**
*	createNote - Creates and adds another piece of text to the devices local storage.
*/
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

/**
*	eraseText - Removes the current value from the text field.
*/
function eraseText() {
document.getElementById("newnote").value = "";
}

/**
*	addNoteToPage - Displays the note value within the note taking page.
*	@param note - Note value to be displayed.
*/
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

/**
*	storeNotes - Add the current note to local storage.
*/
function storeNotes() { 
    // Convert array of notes to string
    var jsonNotes = JSON.stringify(notes);
    // Store the note
	localStorage.setItem(key, jsonNotes);
}

/**
*	loadNotes - Loads all the notes whicha re stored within local storage.
*/
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

 /**
 *	deleteNotes - Deletes all the locally stored notes.
 */
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
