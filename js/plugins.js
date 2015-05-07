document.addEventListener("intel.xdk.camera.picture.add",onSuccess); 
document.addEventListener("intel.xdk.camera.picture.busy",onSuccess); 
document.addEventListener("intel.xdk.camera.picture.cancel",onSuccess); 

function capturePhoto() {
  intel.xdk.camera.takePicture(50,false,"jpg");
}

function onSuccess(evt) {

  if (evt.success == true)
  {
    // create image 
    var image = document.createElement('img');
    image.src=intel.xdk.camera.getPictureURL(evt.filename);
    image.id=evt.filename;
    document.body.appendChild(image);
  }
  else
  {
    if (evt.message != undefined)
    {
        alert(evt.message);
    }
    else
    {
        alert("error capturing picture");
    }
  }
}
