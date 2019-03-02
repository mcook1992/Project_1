// Get Cheapest flight price
var dataToPushToSkyscanner = [];

function getCheapestFlights (airportCode) {

  const instance = axios.create({
    headers: {
      get: {
        "X-RapidAPI-Key": "32546dec3amsh296808ab8e0c6f4p1dd857jsn160dd89c68ad"
      }
    }
  });

  instance
      .get(
          "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/SFO-sky/"+airportCode+"/2019-10-01?inboundpartialdate=2019-11-01'"
      )
      .then(function (result) {
        console.log(result.data);
        console.log(result.data.Quotes["0"].MinPrice);
        console.log(result.data.Quotes["0"].OutboundLeg.CarrierIds["0"]);
        console.log(result.data.Carriers[3].Name);
        console.log(result.data.Quotes["0"].OutboundLeg.DepartureDate);

        let cheapestPrice = result.data.Quotes["0"].MinPrice;
        //let flightDuration ="";  LIVE Flight Search only!
        let carrierName = result.data.Carriers[3].Name;
        let carrierID = console.log(
            result.data.Quotes["0"].OutboundLeg.CarrierIds["0"]
        );

        let myName = "Bing";

        let myCity = "Chicago";

        console.log(
            `My name is ${myName}. My favorite city is ${myCity}. Cheapest Flight I could find is $${cheapestPrice} with ${carrierName} `
        );
      });
}
//POST for live data...TBD
//instance
//  .POST(
//    "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US///JFK-sky/AUS-sky/2019-10-01?inboundpartialdate=2019-11-01"
//  )
//  .then(function(result) {
//    console.log(result.data);
//  });

//Nearest airports to users city input
function closestAirport(arrayOfPlaces) {
  console.log(arrayOfPlaces);

  // for(var i = 0; i < arrayOfPlaces.length; i++){
  //   arrayOfPlaces[i].City = arrayOfPlaces[i].City.replace(" ", "+");
  //   console.log(arrayOfPlaces[i].City);
  // }




 for(var i = 0; i <arrayOfPlaces.length; i++){

   let city = arrayOfPlaces[i].City;

   newSkyscannerObject = {
     id: arrayOfPlaces[i].id,
     City: city,
     url: "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/UK/GBP/en-GB/?query=" + city.replace(" ", "+")
   };
   dataToPushToSkyscanner.push(newSkyscannerObject);
 }

  console.log(dataToPushToSkyscanner);


  // for( var i = 0; i < arrayOfCity.length; i++) {
  //
  //   console.log("DEBUG: CITY PASSED TO SKYSCANNER:", city);
  //   const instance2 = axios.create({
  //     headers: {
  //       get: {
  //         "X-RapidAPI-Key": "32546dec3amsh296808ab8e0c6f4p1dd857jsn160dd89c68ad"
  //       }
  //     }
  //   });
  //
  //
  //   instance2
  //       .get(
  //           "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/UK/GBP/en-GB/?query=" +
  //           city
  //       )
  //       .then(function (result) {
  //         console.log(result.data.Places[0].PlaceId);
  //         arrayOfPlaces[i].AirportCode = result.data.Places[0].PlaceId;
  //
  //       });
  // }
}