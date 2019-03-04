"use strict";

//setting data to firebase

var database = firebase.database();

//setting up users

// $("#signUp").on("click", function(event) {
//   event.preventDefault();

//   firebase
//     .auth()
//     .createUserWithEmailAndPassword(email, password)
//     .catch(function(error) {
//       // Handle Errors here.
//       var errorCode = error.code;
//       var errorMessage = error.message;
//       // ...
//     });
// });

var favoritesRef = database.ref("/favorites");

//setting test data

//pushing data from favorite button into firebase

$("#searchResults").on("click", ".favoriteBTN", function(event) {
  event.preventDefault();
  console.log("favorite button pushed");
  database.ref().push({
    cityName: $(this).attr("resultCity"),
    temperature: $(this).attr("resultTemp"),
    imageURL: "tktk",
    flightPrice: $(this).attr("resultFlight")
  });

  //setting up the favorites display:

  var favoritesDiv = $("<div class='col-lg-4 col-md-6 favorites-container'>");
  var resultImageURL = $(this).attr("imageURL");
  var resultImage = $("<img>").attr(
    "src",
    "assets/Screen Shot 2018-10-16 at 5.10.13 PM copy.png"
  );
  resultImage.attr("class", "favoriteImage");
  var resultCity = $(this).attr("resultCity");
  var resultTemp = $(this).attr("resultTemp");
  var resultFlight = $(this).attr("resultFlight");

  favoritesDiv.append(resultImage);
  favoritesDiv.append(resultImageURL);
  favoritesDiv.append(resultCity);
  favoritesDiv.append(resultTemp);
  favoritesDiv.append(resultFlight);

  $("#favoriteDestinations").append(favoritesDiv);
});

database.ref().on("child_added", function(snapshot) {
  // storing the snapshot.val() in a variable for convenience
  var sv = snapshot.val();

  // Console.loging the last user's data
  //   console.log(sv.cityName);
  //   console.log(sv.temperature);
  //   console.log(sv.imageURL);
  //   console.log(sv.flightPrice);
});
