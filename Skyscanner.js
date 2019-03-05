//--------Declaring Global Vars ---------//
var dataToPushToSkyscanner = [];
var dataFromSkyscanner = [];
var promises = []; //Reusable - Used to prep array of only what is need to insert into API
var masterRecord = [];

//--------Declaring Header with Key for API Calls Skyscanner ---------//
const instance = axios.create({
  headers: {
  get: {
    "X-RapidAPI-Key": "32546dec3amsh296808ab8e0c6f4p1dd857jsn160dd89c68ad"
    }
  }
});

//--------Functions -------//

/**Function that returns the Cheapest Flights
 *
 * @param airportCode {string} Airport Code
 */
function getCheapestFlights (dataFromSkyscanner) {

  for (var i = 0; i < dataFromSkyscanner.length; i++){
    dataFromSkyscanner[i];

  }

  // let airportCode = dataFromSkyscanner[x].airportcode;
  // console.log("DEBUG AIRPORT CODE", airportCode);
  //
  // instance
  //     .get(
  //         "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/SFO-sky/"+airportCode+"/2019-10-01?inboundpartialdate=2019-11-01'"
  //     )
  //     .then(function (result) {
  //       console.log(result);
  //       var masterRecordObject = {
  //         id: dataFromSkyscanner[x].id,
  //         city: dataFromSkyscanner[x].city,
  //         temp: dataFromSkyscanner[x].temp,
  //         price: result.data.Quotes["0"].MinPrice
  //       };
  //       masterRecord.push(masterRecordObject);
  //     })
//
//       }
// //         console.log(result.data);
// //         console.log(result.data.Quotes["0"].MinPrice);
// //         console.log(result.data.Quotes["0"].OutboundLeg.CarrierIds["0"]);
// //         console.log(result.data.Carriers[3].Name);
// //         console.log(result.data.Quotes["0"].OutboundLeg.DepartureDate);
// //
//         let cheapestPrice = result.data.Quotes["0"].MinPrice;
//         //let flightDuration ="";  LIVE Flight Search only!
//         let carrierName = result.data.Carriers[3].Name;
//         let carrierID = console.log(
//             result.data.Quotes["0"].OutboundLeg.CarrierIds["0"]
//         );
//
//         let myName = "Bing";
//
//         let myCity = "Chicago";
//
//         console.log(
//             `My name is ${myName}. My favorite city is ${myCity}. Cheapest Flight I could find is $${cheapestPrice} with ${carrierName} `
//         );
//       });
// }
//POST for live data...TBD
//instance
//  .POST(
//    "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US///JFK-sky/AUS-sky/2019-10-01?inboundpartialdate=2019-11-01"
//  )
//  .then(function(result) {
//    console.log(result.data);
//  });
}

/**Function that uses the City to determine the closest airport
 *
 * @param arrayOfPlaces {Object}
 */
//Nearest airports to users city input
function closestAirportByArray(arrayOfPlaces) {
  console.log(arrayOfPlaces);
  dataToPushToSkyscanner= [];
  dataFromSkyscanner = [];
  for(var i = 0; i <arrayOfPlaces.length; i++){
   let city = arrayOfPlaces[i].City;
   newSkyscannerObject = {
     id: arrayOfPlaces[i].id,
     City: city,
     url: "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/UK/GBP/en-GB/?query=" + city.replace(" ", "+")
   };
   dataToPushToSkyscanner.push(newSkyscannerObject);
   promises.push(newSkyscannerObject.url);
 }

  for (var x = 0; x < promises.length; x++) {
    getData(x);
  }

  // for (var i = 0; i < promises.length; i++){
  //   getCheapestFlights(i);
  // }
  console.log(dataToPushToSkyscanner);
  console.log(dataFromSkyscanner);



  // console.log(dataFromSkyscanner[0]);
  // for (var y = 0; y < dataFromSkyscanner.length; y++){
  //   console.log(dataFromSkyscanner);
  //   combineData(dataFromSkyscanner[y], arrayOfPlaces);
  // }

}

/**Function to make API request using Axios
 *
 * @param x {int} Iterator
 */
function getData(x){
  //instance2 used for the header
  //Making API call on the Array of URLS
  instance.get(promises[x])
      .then(function(response) {
        //Creating new object with x being the unique ID.
        var newObjectFromData = {
            id: x,
            airportcode: response.data.Places[0].PlaceId,
          //TODO: Getting error here
            city: arrayOfPlaces[x].City,
            temp: arrayOfPlaces[x].Temp
        };
        dataFromSkyscanner.push(newObjectFromData);

      }).then(function(response){
    console.log("INSIDE THEN NUMBER 2");
        console.log(x);
        console.log(dataFromSkyscanner[x].airportcode);
        //TODO: Getting undefined error here airport code
    instance
        .get(
            "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/SFO-sky/"+dataFromSkyscanner[x].airportcode+"/2019-10-01?inboundpartialdate=2019-11-01'"
        )
        .then(function (result) {
          console.log("DEBUG QUOTES", result.data.Quotes);
          if(result.data.Quotes.length > 0) {
            console.log("INSIDE IF STATEMENT");
            var masterRecordObject = {
              id: dataFromSkyscanner[x].id,
              city: dataFromSkyscanner[x].city,
              airportcode: dataFromSkyscanner[x].airportcode,
              temp: dataFromSkyscanner[x].temp,
              price: result.data.Quotes[0].MinPrice
            }
            masterRecord.push(masterRecordObject);
          }
          console.log(masterRecord);
        })


  })
      .catch(function(error) {
        console.log(error);
      });

}




// //Function to combine dataToPushedToSkyscanner & dataFromSkyscanner
// function combineData(dataFromSkyscanner, arrayOfPlaces){
//   console.log(dataFromSkyscanner);
//   //Pass in Data set with that has indexes as object properties
//       var buildCombinedDataObject = {
//           id: dataFromSkyscanner.id,  //can be removed just using it for testing purposes
//           temp: arrayOfPlaces[dataFromSkyscanner.id].temp,
//           city: arrayOfPlaces[dataFromSkyscanner.id].City,
//           airportcode: dataFromSkyscanner.airportcode,
//       };
//       console.log(buildCombinedDataObject);
//       combinedDataSet.push(buildCombinedDataObject);
//
//       //Prepping promises of airport codes
//       promises.push(buildCombinedDataObject.airportcode);
// }