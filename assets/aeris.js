/********
 *Aeris API Request Function returns a list of citys, temp and cheap flights.
 *@params tempParam is looking for a temperature (in Celsius) and will add it into the query to be sent to Aeris.
 * @params sortParam will allow us to return a sorted array from Aeris
 * @params maxTemp is used to remove places that are hotter than temp tange
 * @params is the departure city
 */
function aerisAPIRequest (tempParam, sortParam, maxTemp, OriginID) {

    //Clearing array on every request
    arrayOfPlaces = [];


    <!--BUILDING AERIS URL REQUEST -->
    //API URL beginning - Shouldn't Change
    const aerisApiBeginFixed = 'https://api.aerisapi.com';
    //API Credentials - Shouldn't Change
    const apiCredentials = 'client_id=bvpLuTRRLs5tMbTcMqmhm&client_secret=0Bpm48kezpufXqLX6UzBvpBSfkGG4zOH6b6CuUwj';

    //Params part of the API Query
    const endPoint = '/observations/search?query=temp:'+ tempParam + '&sort=temp:'+ sortParam + '&limit=250&';

    //Building the full query
    const queryUrl = aerisApiBeginFixed + endPoint + apiCredentials;



    //Begin Ajax request
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function (response) {

        const cities = sortResults(response, maxTemp);
        
         cities.forEach(({City: cityName, Temp: temp, Country: country}) => {
             const airportRequestURI = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/"+country+"/USD/en-US/?query=" + cityName.replace(" ", "+");
             skyScanner.get(airportRequestURI)
                 .then((res) => {
                     if(res.data.Places[0].PlaceId !== undefined) {
                         const destinationAirportID = res.data.Places[0].PlaceId;
                         const cheapestFlightsURI = `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/${OriginID}/`+ destinationAirportID + "/2019-10-01?inboundpartialdate=2019-11-01"
                         skyScanner.get(cheapestFlightsURI)
                             .then(res => {

                                 const {Places: places, Quotes: quotes} = res.data;

                                 places.length > 1 && quotes.length > 0 ? console.log(`FLIGHT: ${places[1].IataCode} to ${places[0].IataCode} @ $${quotes[0].MinPrice} on ${quotes[0].QuoteDateTime}`) : null;

                                 if(places.length > 1 && quotes.length > 0) {
                                     var createDisplayObject;
                                     if(places[0].IataCode === "JFK" ||
                    places[0].IataCode === "LGA" ||
                    places[0].IataCode === "EWR") {
                                         createDisplayObject = {
                                             cityName: places[1].CityName,
                                             price: "$" + quotes[0].MinPrice,
                                             temp: temp
                                         };

                                         cityResults.push(createDisplayObject);
                                     }else{
                                         createDisplayObject = {
                                             cityName: places[0].CityName,
                                             price: "$" + quotes[0].MinPrice,
                                             temp: temp
                                         };

                                         cityResults.push(createDisplayObject);
                                     }


                                 }

                             })
                     }
                 })
                 .catch()
         })
    }).done((res) => { setTimeout(createImageResults,40000); setTimeout(getResults,50000)}).catch(function (error) {


    });
}

/**
 * Sorts and removes temps
 * @param result
 * @param maxTemp
 * @returns {Array}
 */
function sortResults (result, maxTemp){
var counter = 0;
arrayOfPlaces = [];
    for(var i = 0; i<result.response.length; i++){

     if (counter < 250){
         if (result.response[i].ob.tempC < maxTemp) {
             var newPlacesObject = {
                 id: i,
                 Temp: result.response[i].ob.tempF,
                 City: result.response[i].place.name,
                 Country: result.response[i].place.country
             };
             var index = newPlacesObject.City.indexOf("/");
             if (index > 0){
                 newPlacesObject.City = newPlacesObject.City.substring(0,index);
             }
             var parantStringTest = newPlacesObject.City.indexOf("(");
             if(parantStringTest > 0){
                 newPlacesObject.City = newPlacesObject.City.substring(0, parantStringTest);
             }
             var airportStringTest = newPlacesObject.City.indexOf("air");
             if(airportStringTest >0){
                 newPlacesObject.City = newPlacesObject.City.substring(0, airportStringTest);
             }
             arrayOfPlaces.push(newPlacesObject);
             counter++;

         }

     }



    }
    return arrayOfPlaces;


}


