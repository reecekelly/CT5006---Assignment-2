//Notes Javascript	

if(
		typeof(Storage) !== "undefined") {
    // Code for localStorage/sessionStorage.
		} else {
    // Sorry! No Web Storage support..
	}
    function set(){
    var cont = document.getElementById("tododesc").value;
	localStorage.setItem("task-desc", cont);

    showDiv();
    }


  function showDiv(){

  document.getElementById("saved-notes").innerHTML+="<h4>"+localStorage.getItem('task')+"</h4>";
  }
 