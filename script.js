// used Google's Map Javascript API sample as reference found here:
// https://developers.google.com/maps/documentation/javascript/examples/places-searchbox

var numDests = 2;
var dests = [];

function boxes() {
  // Add the start input box
  var startInput = document.getElementById("start");
  var startBox = new google.maps.places.SearchBox(startInput);
  
  boxListener(startBox, 0); // Function listens for user input and adds to array
  
  // add the first destination input box
  var destInput = document.getElementById("dest1");
  var destBox = new google.maps.places.SearchBox(destInput);
  
  boxListener(destBox, 1);
  
  // whenever the add button is clicked, add a new input box
  var addBtn = document.getElementById("add");
  addBtn.addEventListener("click", function() {
    var index = numDests;
    numDests++;
    
    var newInput = document.createElement("input");
    newInput.type = "text";
    newInput.placeholder = "Destination";
    newInput.className = "form-control"; // for bootstrap styling
    document.getElementById("dest-boxes").appendChild(newInput);
    var newBox = new google.maps.places.SearchBox(newInput);
    
    boxListener(newBox, index);
  });
}

function boxListener(box, destIndex) {
  box.addListener("places_changed", function() {
    var places = box.getPlaces(); // getPlaces returns an array
    // use the first place returned. Multiple are returned if user clicks on a "near"
    // result, so go with the first place in the list
    dests[destIndex] = places[0].formatted_address;
    createLink(); // whenever a destination is changed or created, generate a new link
  });
}

function createLink() {
  // generate a link based on the current destinations 
  var link = "https://www.google.com/maps/dir/";
  dests.forEach(function(addr) {
    link += addr.replace(/\s/g, "+") + "/"; // replace all spaces with + in each address
  });
  document.getElementById("go").href = link;
}