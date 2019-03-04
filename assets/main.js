"use strict";

var departureCity = $("#origin").val();

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
    var resultCity = $("<p class='resultsLocation'>").text(results[i].city);
    var resultTemp = $("<p class='resultsTemp'>").text(results[i].temp);
    var resultFlight = $("<p class='resultsFlight'>").text(
      results[i].flightPrice
    );

    var favoriteButton = $("<button class='favoriteButton'>");
    favoriteButton.text("Favorite");
    favoriteButton.attr("resultCity", resultCity.text());
    favoriteButton.attr("resultTemp", resultTemp.text());
    favoriteButton.attr("resultFlight", resultFlight.text());
    favoriteButton.attr("imageURL", "tktktk");
    favoriteButton.attr("class", "btn btn-default favoriteBTN");

    resultsDiv.append(resultImage);
    resultsDiv.append(resultCity);
    resultsDiv.append(resultTemp);
    resultsDiv.append(resultFlight);
    resultsDiv.append(favoriteButton);

    $("#searchResults").append(resultsDiv);
  }
}
$("#searchBtn").on("click", function(event) {
  event.preventDefault();
  getResults();
});

//alert("We have contact");

//this is related to the flight stuff

var maxTemp = 0;

//Listening for a dropdown option to be selected

$("#searchDropdown").on("change", function() {
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
      closestAirport("New York");
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
  departureCity = $("#origin").val();
  console.log(departureCity);

  //USE THIS CODE FOR WHEN WE CAN'T GET A RESULT
  //   var newDiv = $("<div>");
  //   var varText = $("<p>").text("We could not find any results");
  //   newDiv.append(varText);
  //   $("#searchResults").prepend(newDiv);
});

//Hot = 80-95
//Warm = 70-75
//cool = 55-65
//cold = 30-35
//Freezing = 10-18

//TODO; Sort data and exclude items Display on frontend
