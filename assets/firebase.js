"use strict";

//setting data to firebase

var database = firebase.database();

var ref = database.ref("/favorites");

//setting test data

database.ref().set({
  cityName: "New York",
  temperature: "80",
  imageURL: "tktk",
  flightPrice: "$100"
});

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
});

ref.on("value", function(snap) {});
