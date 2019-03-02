"use strict";

var departureCity;

//Create sample array with results
var results = [
  {
    city: "NYC",
    temp: "30F",
    flightPrice: "$250"
  },
  {
    city: "Los Angeles",
    temp: "70F",
    flightPrice: "$375"
  },
  {
    city: "Rome",
    temp: "55F",
    flightPrice: "$500"
  }
];

//The above is a test array. This function allows us to populate the page with five new results
function getResults() {
  for (var i = 0; i < results.length; i++) {
    var resultsDiv = $("<div class='col-lg-4 col-md-6 results-container'>");
    var resultImage = $(
      "<img id='resultImage' src='assets/Screen Shot 2018-10-16 at 5.10.13 PM copy.png' alt='test image'/>"
    );
    var resultCity = $("<p id='resultsLocation'>").text(results[i].city);
    var resultTemp = $("<p id='resultsTemp'>").text(results[i].temp);
    var resultFlight = $("<p id='resultsFlight'>").text(results[i].flightPrice);

    resultsDiv.append(resultImage);
    resultsDiv.append(resultCity);
    resultsDiv.append(resultTemp);
    resultsDiv.append(resultFlight);

    $("#searchResults").append(resultsDiv);
  }
}
getResults();

//alert("We have contact");

//this is related to the flight stuff

var maxTemp = 0;

//Listening for a dropdown option to be selected
$("#sel1").on("change", function() {
  //Taking the value of the User Selection and parsing it into an Int
  var userInput = parseInt(this.value);

  //Setting Min Max For each Category
  if (userInput === 1) {
    maxTemp = 35;
  }
  if (userInput === 2) {
    maxTemp = 23.8889;
  }
  if (userInput === 3) {
    maxTemp = 18.3333;
  }
  if (userInput === 4) {
    maxTemp = 1.67;
  }
  if (userInput === 5) {
    maxTemp = -7.77778;
  }

  //Selected value is passed as a parameter to a switch
  switch (userInput) {
    case 1:
      aerisAPIRequest(26.67, -1, maxTemp);
      break;
    case 2:
      aerisAPIRequest(21, 9, maxTemp);
      break;
    case 3:
      aerisAPIRequest(12.78, 999, maxTemp);
      break;
    case 4:
      aerisAPIRequest(-1.1, 999, maxTemp);
    case 5:
      aerisAPIRequest(-12.22, 999, maxTemp);
  }
});

//confirm whether user actually typed a city

$("#searchBtn").on("click", function(event) {
  event.preventDefault();
  departureCity = $("#searchCurrLoc").val();
  console.log(departureCity);
  if ($("#searchCurrLoc").val().length < 2) {
    var newDiv = $("<div>");
    var varText = $("<p>").text("We could not find any results");
    newDiv.append(varText);
    $("#searchResults").prepend(newDiv);
  }
});

//Hot = 80-95
//Warm = 70-75
//cool = 55-65
//cold = 30-35
//Freezing = 10-18

//TODO; Sort data and exclude items Display on frontend
