"use strict";

//setting data to firebase

var database = firebase.database();
var uid = "test";
var sampleArray = [];
var favoritesRef = database.ref("/users");
var specifcUserRef = favoritesRef.child(uid);

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    uid = firebase.auth().currentUser.uid;
    specifcUserRef = favoritesRef.child(uid);
    $("#signIn").addClass("d-none");
    $("#signUp").addClass("d-none");

    specifcUserRef.once("value", function(snapshot) {
      //   console.log(snapshot.val().users);

      snapshot.forEach(function(userFavoriteInfo) {
        var userFavoriteInfoVal = userFavoriteInfo.val();
        sampleArray.push(userFavoriteInfoVal);
      });

      populatePreviousFavoriteElements();
      // .then(function() {
      //   for (var x = 0; x < sampleArray.length; x++) {
      //     console.log(sampleArray[x].cityName);
      //   }
      // });
    });
  } else {
    console.log("No user is signed on");

    // No user is signed in.
  }
});

//load firebase info on page load

specifcUserRef.once("value", function(snapshot) {
  //   console.log(snapshot.val().users);

  snapshot.forEach(function(userFavoriteInfo) {
    var userFavoriteInfoVal = userFavoriteInfo.val();
    sampleArray.push(userFavoriteInfoVal);
  });

  populatePreviousFavoriteElements();
  // .then(function() {
  //   for (var x = 0; x < sampleArray.length; x++) {
  //     console.log(sampleArray[x].cityName);
  //   }
  // });
});

//function that populates users past favorites on Firebase

function populatePreviousFavoriteElements() {
  for (var x = 0; x < sampleArray.length; x++) {
    var favoritesDiv = $("<div class='col-lg-4 col-md-6 favorites-container'>");
    var resultImage = $("<img>").attr(
      "src",
      "assets/Screen Shot 2018-10-16 at 5.10.13 PM copy.png"
    );
    resultImage.attr("class", "favoriteImage");
    var resultCity = sampleArray[x].cityName;
    var resultTemp = sampleArray[x].temperature;
    var resultFlight = sampleArray[x].flightPrice;

    favoritesDiv.append(resultImage);

    favoritesDiv.append(resultCity);
    favoritesDiv.append(resultTemp);
    favoritesDiv.append(resultFlight);

    $("#favoriteDestinations").append(favoritesDiv);
  }
}

//setting up users

$("#signUp").on("click", function(event) {
  event.preventDefault();
  $("#signInForm").attr("class", "d-none");
  $("#signUpForm").removeClass("d-none");

  //   firebase
  //     .auth()
  //     .createUserWithEmailAndPassword(email, password)
  //     .catch(function(error) {
  //       // Handle Errors here.
  //       var errorCode = error.code;
  //       var errorMessage = error.message;
  //       // ...
  // });
});

$("#signIn").on("click", function(event) {
  event.preventDefault();
  $("#signUpForm").attr("class", "d-none");
  $("#signInForm").removeClass("d-none");
});

//creating new user when submit button is pressed
$("#signUpSubmit").on("click", function(event) {
  event.preventDefault();
  var email = $("#signUpEmail").val();
  var password = $("#signUpPwd").val();

  //making sure the user email is actually an email

  if (email.indexOf("@") > -1 && email.indexOf(".") > -1) {
    console.log("The email and password is " + email + password);

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode + errorMessage);

        // ...
      });
  } else {
    console.log("Please enter a valid email");
  }
});

//signing in existing users

$("#signInSubmit").on("click", function(event) {
  event.preventDefault();
  var email = $("#signInEmail").val();
  var password = $("#signInPwd").val();

  console.log("The email and password is " + email + password);

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });

  $("#signInForm").addClass("d-none");
  $("#signIn").addClass("d-none");
  $("#signUp").addClass("d-none");
});

//letting users sign out

$("#signOut").on("click", function(event) {
  event.preventDefault();
  firebase
    .auth()
    .signOut()
    .then(
      function() {
        console.log("Signed Out");
        $("#favoriteDestinations").empty();
      },
      function(error) {
        console.error("Sign Out Error", error);
      }
    );
});

//setting test data

//pushing data from favorite button into firebase

$("#searchResults").on("click", ".favoriteBTN", function(event) {
  event.preventDefault();
  database
    .ref()
    .child("/users")
    .child(uid)
    .push({
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

  $("#favoriteDestinations").prepend(favoritesDiv);
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
