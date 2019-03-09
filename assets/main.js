"use strict";



<!-- Declaring Global Variables -->

var departureCity = $("#origin").val(); //Stores departure city chosen
var arrayOfPlaces = []; //Stores an array of places, temp, city, countrys
const skyScanner = axios.create({
    headers: {
        get: {
            "X-RapidAPI-Key": "32546dec3amsh296808ab8e0c6f4p1dd857jsn160dd89c68ad"
        }
    }
});
let cityResults = []; //Returns Cities based on Temp
let imageResults = []; //Returns images based on city



function createImageResults() {
  //for loop to get array of flyTags into data
  for (let i = 0; i < cityResults.length; i++) {
    let imageData = cityResults[i].cityName;
    let queryURL =
      "https://api.unsplash.com/search/photos?client_id=5eed2514ffdf7db5fd835355ef84cf034625d5a36587ce7e829c47f1164c2e91&page=1&query=" +
      imageData;

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      // imageResults.push(response.results["0"].urls.regular);

      var imageResultObject = {
        indexValue: i,
        cityImageUrl: response.results["0"].urls.regular,
        cityName: imageData
      };

      imageResults[i] = imageResultObject;
    });
  }
  console.log(imageResults);
}

//displays results: runs through 4 arrays for city, image, temp, price, to create results blocks
function getResults() {


  for (var i = 0; i < cityResults.length; i++) {
    var resultsDiv = $("<div class='col-lg-4 col-md-6 results-container'>");

    var resultImage = $("<img class='resultImage'/>");
    resultImage.attr("src", imageResults[i].cityImageUrl);
    resultImage.attr("alt", imageResults[i].cityName);

    var resultCity = $("<p id='resultsLocation'>").text(
      cityResults[i].cityName
    );
    var resultTemp = $("<p id='resultsTemp'>").text(cityResults[i].temp);
    var resultFlight = $("<p id='resultsFlight'>").text(cityResults[i].price);

    resultsDiv.append(resultImage);
    resultsDiv.append(resultCity);
    resultsDiv.append(resultTemp);
    resultsDiv.append(resultFlight);

    var favoriteButton = $("<button class='favoriteButton'>");
    favoriteButton.text("Favorite");
    favoriteButton.attr("resultCity", resultCity.text());
    favoriteButton.attr("resultTemp", "70");
    favoriteButton.attr("resultFlight", "250");
    favoriteButton.attr("imageURL", imageResults[i].cityImageUrl);
    favoriteButton.attr("class", "btn btn-default favoriteBTN");

    resultsDiv.append(favoriteButton);

    $("#searchResults").append(resultsDiv);
  }
}
$("#searchBtn").on("click", function(event) {
  event.preventDefault();
    
     // // //on button press extra actions -Teddy
  // // //scroll down by 500 pixels on search button click...added smooth behavior for bonus points
  // // window.scroll({
  // //   top: 500,
  // //   left: 0,
  // //   behavior: "smooth"
  // // });

  // //button press shows loading gif until success

  // $("#img").show(); //<----show gif
  // $.ajax({
  //   success: function(results) {
  //     $("#img").hide(); //<--- hide again
  //   }
  //   //  )}
  // });
  // //-Teddy
    
});

//this is related to the flight stuff

var maxTemp = 0;

//Listening for a dropdown option to be selected


$('#searchBtn').on("click", function(evt) {

    var userInput = parseInt($("#temp").val());
    //Taking the value of the User Selection and parsing it into an Int
    var departureCity = $("#origin").val();

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
            $("#searchResults").empty();
            imageResults = [];
            aerisAPIRequest(26.67, -1, maxTemp, departureCity);
            break;
        case 2:
            $("#searchResults").empty();
            imageResults = [];
            aerisAPIRequest(21, 9, maxTemp, departureCity);
            break;
        case 3:
            $("#searchResults").empty();
            imageResults = [];
            aerisAPIRequest(12.78, 999, maxTemp, departureCity);
            break;
        case 4:
            $("#searchResults").empty();
            imageResults = [];
            aerisAPIRequest(-1.1, 999, maxTemp, departureCity);
        case 5:
            $("#searchResults").empty();
            imageResults = [];
            aerisAPIRequest(-12.22, 999, maxTemp, departureCity);

    }

})

//confirm whether user actually typed a city

$("#searchBtn").on("click", function(event) {
  event.preventDefault();
  departureCity = $("#origin").val();

});



