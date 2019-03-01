/**
 * Different enpoints that were tested
 */


/** Enpoint Observation Returning temp closests to Zip 10027 and sorting temp on response*/
//const endPoint = '/observations/closest?p=10027&search?query=sort=temp:&limit=25' + '&';

// const endPoint = '/observations/search?query=sort=temp:-1&limit=25' + '&';

//const endPoint = '/observations/search?query=country:us&sort=temp:-1&limit=25&';

//const endPoint = '/normals/search?query=tavg:75&sort=temp:-1&limit=25&';

// const endPoint = '/observations/within?p=10027&query=temp:21.1&radius=3000mi&limit=100&';

// const endPoint = '/observations/search?query=temp:21.1&sort=temp:-1&limit=250&';

//const endPoint = '/observations/search?query=temp:42.76&limit=250&';

//const queryUrl = 'https://api.aerisapi.com/normals/closest?p=:auto&radius=100000miles&limit=100000&client_id=bvpLuTRRLs5tMbTcMqmhm&client_secret=0Bpm48kezpufXqLX6UzBvpBSfkGG4zOH6b6CuUwj';






/********
*Aeris API Request Function is a reusable Ajax call to Aeris API
*@params tempParam is looking for a temperature (in Celsius) and will add it into the query to be sent to Aeris.
 */
function aerisAPIRequest (tempParam) {
    //API URL beginning - Shouldn't Change
    const aerisApiBeginFixed = 'https://api.aerisapi.com';
    //API Credentials - Shouldn't Change
    const apiCredentials = 'client_id=bvpLuTRRLs5tMbTcMqmhm&client_secret=0Bpm48kezpufXqLX6UzBvpBSfkGG4zOH6b6CuUwj';

    //Params part of the API Query
    const endPoint = '/observations/search?query=temp:'+ tempParam + '&limit=250&';

    //Building the full query
    const queryUrl = aerisApiBeginFixed + endPoint + apiCredentials;

    //Begin Ajax request using jQuery
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function (response) {
        console.log(response);
    }).catch(function (error) {
        console.log(error);
    });

}

