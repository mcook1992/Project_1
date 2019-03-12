
var skyScanner = axios.create({
    headers: {
        get: {
            "X-RapidAPI-Key": "32546dec3amsh296808ab8e0c6f4p1dd857jsn160dd89c68ad"
        }
    }
});

var promisesData = [];

function aerisAPIRequest (tempParam, sortParam, maxTemp) {


    let queryUrl = `https://api.aerisapi.com/observations/search?query=temp:${tempParam}&sort=temp:${sortParam}&limit=50&client_id=bvpLuTRRLs5tMbTcMqmhm&client_secret=0Bpm48kezpufXqLX6UzBvpBSfkGG4zOH6b6CuUwj`;

    async function getCitiesByTemp() {
        let res = await
            fetch(queryUrl);
        let data = await
            res.json();
        let cities = await sortResults(data, maxTemp);

        getSkyscannerPromises(cities)
            .then()
            .catch();

    };

    getCitiesByTemp()
        .then()
        .catch();
}

function sortResults (result, maxTemp) {
    var counter = 0;
    arrayOfPlaces = [];
    for (var i = 0; i < result.response.length; i++) {

        if (counter < 50) {
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
            let word = (window.resultsCounter === 1) ? 'result' : 'results';
            setPreloader("Searching ("+ (i+1) +" cities)../ "+ window.resultsCounter  +" " + word + " found");
            let airportRequestURI = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/UK/GBP/en-GB/?query=" + cities[i].City.replace(" ", "+");
            await skyScanner.get(airportRequestURI)
                .then(res =>{

            if (res.data.Places  || res !== undefined) {
                let destinationAirportID = res.data.Places[0].PlaceId;

                if(destinationAirportID !== undefined){

                let cheapestFlightsURI = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/JFK-sky/" + destinationAirportID + "/2019-03-28?inboundpartialdate=2019-04-15"

                    skyScanner.get(cheapestFlightsURI).then(res => {

                const {Places: places, Quotes: quotes} = res.data;
                    //console.log(res.data);
                if( places.length > 1 && quotes.length > 0){
                    //console.log(`FLIGHT: ${places[1].IataCode} to ${places[0].IataCode} @ $${quotes[0].MinPrice} on ${quotes[0].QuoteDateTime}`);
                    let cityName = places[0].IataCode === "JFK" ? places[1].CityName : places[0].CityName

                    //let imageResult = fetch(`https://api.unsplash.com/search/photos?client_id=5eed2514ffdf7db5fd835355ef84cf034625d5a36587ce7e829c47f1164c2e91&page=1&query=${cityName}`);
                    //let data = imageResult.json();
                    //console.log(data);

                    let renderData = {
                        image: null,
                        cityName: cityName,
                        temp: cities[i].Temp,
                        price: cities[i].price,
                    }

                    renderResult(renderData);
                    //console.log(cityName);
                    //console.log(`FLIGHT: ${places[1].IataCode} to ${places[0].IataCode} @ $${quotes[0].MinPrice} on ${quotes[0].QuoteDateTime}`);
                    //createImageResults(cityName);

                }










            }).
                catch(error => {}
            )
                ;
            }}

            }

            ).catch(function(rej, res){

            });

            //promisesData.push(airportRequestURI);



        };

        let word = (window.resultsCounter === 1) ? 'result' : 'results';
        setPreloader("Search Complete. "+ window.resultsCounter +" " + word + " found");
    }

// async function createImageResults(city) {
//     console.log("DEBUG", city)
//     //for loop to get array of flyTags into data
//
//
//     $.ajax({
//         url: queryURL,
//         method: "GET"
//     }).then(function(response) {
//
//     });
//
//
// }

function renderResult(data) {


    window.resultsCounter++;

    // Prepare card
    var resultImage = $("<img class='resultImage' id='image-"+data.cityName+"' />");
    resultImage.attr("src", "");
    resultImage.attr("height", "250px");
    resultImage.attr("alt", data.cityName);

    var resultCity = $("<p id='resultsLocation'>").text(data.cityName);
    var resultTemp = $("<p id='resultsTemp'>").text(data.temp);
    var resultFlight = $("<p id='resultsFlight'>").text(data.price);



    // Prepare favorite button
    var favoriteButton = $("<button class='favoriteButton' data-city='"+data.cityName+"'>");
    favoriteButton.text("Favorite");
    favoriteButton.attr("resultCity", data.cityName);
    favoriteButton.attr("resultTemp", "70");
    favoriteButton.attr("resultFlight", "250");
    favoriteButton.attr("imageURL", data.image);
    favoriteButton.attr("class", "btn btn-default favoriteBTN");
    favoriteButton.attr("id", "favorite-" + data.cityName);






    async function findAndInsertImage(cityName) {
        imageResult = fetch(`https://api.unsplash.com/search/photos?client_id=5eed2514ffdf7db5fd835355ef84cf034625d5a36587ce7e829c47f1164c2e91&page=1&query=${cityName}`)
            .then(res => {
                let responseJson = res.json();
                console.log("DEBUG: ",responseJson);
                return responseJson;

            })
            .then(imagesResponse => {
                console.log("DEBUG: ",imagesResponse.results[0].urls.regular);
                let imageUrl = '';
                if(imagesResponse.results[0]) {
                    imageUrl = imagesResponse.results[0].urls.regular;
                } else {
                    imageUrl = '';
                }

                $("#image-" + cityName).attr('src', imageUrl);
                $("#favorite-" + cityName).attr('imageURL', imageUrl);

            })
            .catch(console.log);
    }

    findAndInsertImage(data.cityName).then(res => {
        var resultsDiv = $("<div class='col-lg-4 col-md-6 results-container'>");
        resultsDiv.append(resultImage);
        resultsDiv.append(resultCity);
        resultsDiv.append(resultTemp);
        resultsDiv.append(resultFlight);

        resultsDiv.append(favoriteButton);

        $("#searchResults").prepend(resultsDiv);

    });

    // Append results

}