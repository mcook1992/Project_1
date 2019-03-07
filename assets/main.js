"use strict";

var departureCity = $("#origin").val();
var userTempSelect = $("#temp").val();


//unsplash image results API and URLs
let cityResults = ["London", "New York", "Paris", "San Juan", "Honolulu"];
let imageResults = [];
// Generic function for capturing the tag name from the data-attribute
//createImageResults();

function createImageResults() {
  //for loop to get array of flyTags into data
  for (let i = 0; i < cityResults.length; i++) {
    let imageData = cityResults[i];
    let queryURL =
      "https://api.unsplash.com/search/photos?client_id=5eed2514ffdf7db5fd835355ef84cf034625d5a36587ce7e829c47f1164c2e91&page=1&query=" +
      imageData;

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      imageResults.push(response.results["0"].urls.regular);
    });
  }
  console.log(imageResults);
}
//displays results: runs through 4 arrays for city, image, temp, price, to create results blocks
function getResults() {
  for (var i = 0; i < cityResults.length; i++) {
    var resultsDiv = $("<div class='col-lg-4 col-md-6 results-container'>");
    
    var resultImage = $("<img class='resultImage'/>");
    resultImage.attr("src", imageResults[i]);
    resultImage.attr("alt", cityResults[i]);

    var resultCity = $("<p id='resultsLocation'>").text(cityResults[i]);
    // var resultTemp = $("<p id='resultsTemp'>").text(results[i].temp);
    // var resultFlight = $("<p id='resultsFlight'>").text(results[i].flightPrice);

    resultsDiv.append(resultImage);
    resultsDiv.append(resultCity);
    // resultsDiv.append(resultTemp);
    // resultsDiv.append(resultFlight);

   

    var favoriteButton = $("<button class='favoriteButton'>");
    favoriteButton.text("Favorite");
    favoriteButton.attr("resultCity", resultCity.text());
    favoriteButton.attr("resultTemp", "70");
    favoriteButton.attr("resultFlight", "250");
    favoriteButton.attr("imageURL", imageResults[i]);
    favoriteButton.attr("class", "btn btn-default favoriteBTN");

    resultsDiv.append(resultImage);
    resultsDiv.append(resultCity);
//     resultsDiv.append(resultTemp);
//     resultsDiv.append(resultFlight);
    resultsDiv.append(favoriteButton);


    $("#searchResults").append(resultsDiv);
  }
}
$("#searchBtn").on("click", function(event) {
  event.preventDefault();
  //getResults();
});

//this is related to the flight stuff

var maxTemp = 0;

//Listening for a dropdown option to be selected

$('#searchBtn').on("click", function(evt) {

    var userInput = parseInt($("#temp").val());
    //Taking the value of the User Selection and parsing it into an Int
    console.log(userInput);
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

})

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
