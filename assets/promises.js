
const skyScanner = axios.create({
    headers: {
        get: {
            "X-RapidAPI-Key": "32546dec3amsh296808ab8e0c6f4p1dd857jsn160dd89c68ad"
        }
    }
});

const promisesData = [];

function aerisAPIRequest (tempParam, sortParam, maxTemp) {
    //API URL beginning - Shouldn't Change
    const aerisApiBeginFixed = 'https://api.aerisapi.com';
    //API Credentials - Shouldn't Change
    const apiCredentials = 'client_id=bvpLuTRRLs5tMbTcMqmhm&client_secret=0Bpm48kezpufXqLX6UzBvpBSfkGG4zOH6b6CuUwj';

    //Params part of the API Query
    const endPoint = '/observations/search?query=temp:'+ tempParam + '&sort=temp:'+ sortParam + '&limit=250&';

    //Building the full query
    const queryUrl = aerisApiBeginFixed + endPoint + apiCredentials;

   async function getCitiesByTemp() {
        const res = await
        fetch(queryUrl);

        const data = await
        res.json();


        const cities = await sortResults(data, maxTemp);
        console.log(cities);

        await getSkyscannerPromises(cities);


    };





    getCitiesByTemp();
    // //Begin Ajax request using jQuery
    // $.ajax({
    //     url: queryUrl,
    //     method: "GET"
    // }).then(function (response) {
    //     //console.log(response.response[0].ob.tempF);
    //     //console.log(response)
    //     const cities = sortResults(response, maxTemp);
    //     cities.forEach(({City: cityName}) => {
    //         const airportRequestURI = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/UK/GBP/en-GB/?query=" + cityName.replace(" ", "+");
    //     skyScanner.get(airportRequestURI)
    //         .then((res) => {
    //         if(res.data.Places[0].PlaceId !== undefined) {
    //         const destinationAirportID = res.data.Places[0].PlaceId;
    //         const cheapestFlightsURI = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/JFK-sky/" + destinationAirportID + "/2019-10-01?inboundpartialdate=2019-11-01'"
    //         skyScanner.get(cheapestFlightsURI)
    //             .then(res => {
    //             //console.log(res);
    //             const {Places: places, Quotes: quotes} = res.data;
    //
    //         places.length > 1 && quotes.length > 0 ? console.log(`FLIGHT: ${places[1].IataCode} to ${places[0].IataCode} @ $${quotes[0].MinPrice} on ${quotes[0].QuoteDateTime}`) : null;
    //
    //         if(places.length > 1 && quotes.length > 0) {
    //             var createDisplayObject;
    //             if(places[0].IataCode === "JFK") {
    //                 createDisplayObject = {
    //                     cityName: places[1].CityName,
    //                     price: "$" + quotes[0].MinPrice,
    //                     temp: 70
    //                 };
    //
    //                 cityResults.push(createDisplayObject);
    //             }else{
    //                 createDisplayObject = {
    //                     cityName: places[0].CityName,
    //                     price: "$" + quotes[0].MinPrice,
    //                     temp: 70
    //                 };
    //
    //                 cityResults.push(createDisplayObject);
    //             }
    //
    //
    //         }
    //
    //     })
    //     }
    // })
    // .catch()
    // })
    // }).done((res) => { console.log("DEBUG: HIT THE LAST THEN"); setTimeout(createImageResults,30000); setTimeout(getResults,40000)}).catch(function (error) {
    //     //console.log(error);
    //
    // });
}

function sortResults (result, maxTemp) {
    var counter = 0;
    arrayOfPlaces = [];
    for (var i = 0; i < result.response.length; i++) {

        if (counter < 250) {
            if (result.response[i].ob.tempC < maxTemp) {
                var newPlacesObject = {
                    id: i,
                    Temp: result.response[i].ob.tempF,
                    City: result.response[i].place.name,
                    Country: result.response[i].place.country
                };
                var index = newPlacesObject.City.indexOf("/");
                if (index > 0) {
                    newPlacesObject.City = newPlacesObject.City.substring(0, index);
                }
                var parantStringTest = newPlacesObject.City.indexOf("(");
                if (parantStringTest > 0) {
                    newPlacesObject.City = newPlacesObject.City.substring(0, parantStringTest);
                }
                var airportStringTest = newPlacesObject.City.indexOf("air");
                if (airportStringTest > 0) {
                    newPlacesObject.City = newPlacesObject.City.substring(0, airportStringTest);
                }
                arrayOfPlaces.push(newPlacesObject);
                counter++;

            }

        }

        //result.response[i].ob.tempC
        //look at temp ...if greater than max move on else less store in array

    }
    return arrayOfPlaces;

}

async function getSkyscannerPromises (cities) {
        for (var i = 0; i < cities.length; i++) {
            const airportRequestURI = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/UK/GBP/en-GB/?query=" + cities[i].City.replace(" ", "+");
            skyScanner.get(airportRequestURI).then(res=>{
                const {Places: places, Quotes: quotes} = res.data;
                if(places.length > 1 && quotes.length > 0) {
                var createDisplayObject;
                if(places[0].IataCode === "JFK") {
                    createDisplayObject = {
                        cityName: places[1].CityName,
                        price: "$" + quotes[0].MinPrice,
                        temp: 70
                    };

                    cityResults.push(createDisplayObject);
                }else{
                    createDisplayObject = {
                        cityName: places[0].CityName,
                        price: "$" + quotes[0].MinPrice,
                        temp: 70
                    };

                    cityResults.push(createDisplayObject);
                }
            }}
                ).catch();
            //promisesData.push(airportRequestURI);

        }
        console.log(promisesData);

    }

