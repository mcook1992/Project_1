"use strict";

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

function getResults() {
  for (var i = 0; i < results.length; i++) {
    var resultsDiv = $(
      "<div class='col-lg-4 col-md-6' id='results-container'>"
    );
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
