"use strict";

//setting data to firebase

var database = firebase.database();

var ref = database.ref("/connections");

database.ref("/favorites").set({
  cityName: "New York",
  temperature: "80",
  imageURL: "tktk",
  flightPrice: "$100"
});

ref.on("value", function(snap) {
  alert("We're in the on value function");
});
