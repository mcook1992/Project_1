

// window.onload = function() {
//
//     /**
//      * STEP 2
//      * Set your account access keys when the page and scripts have loaded.
//      */
//     const aeris = new AerisWeather('bvpLuTRRLs5tMbTcMqmhm', '0Bpm48kezpufXqLX6UzBvpBSfkGG4zOH6b6CuUwj');
//
//     console.log(aeris.clientId);
//     /**
//      * STEP 3
//      * Start using the library by accessing the available convenience methods on your `AerisWeather` instance.
//      */
//     aeris.api().endpoint('normals').radius('10miles').get().then((result) => {
//         console.log("DEBUG:", result);
//         const data = result.data.ob;
//         console.log((data));
//     });
//
// };

const aerisApiBeginFixed = 'https://api.aerisapi.com';
//const endPoint = '/observations/closest?p=10027&search?query=sort=temp:&limit=25' + '&';

// const endPoint = '/observations/search?query=sort=temp:-1&limit=25' + '&';

//const endPoint = '/observations/search?query=country:us&sort=temp:-1&limit=25&';

//const endPoint = '/normals/search?query=tavg:75&sort=temp:-1&limit=25&';

// const endPoint = '/observations/within?p=10027&query=temp:21.1&radius=3000mi&limit=100&';

// const endPoint = '/observations/search?query=temp:21.1&sort=temp:-1&limit=250&';

const endPoint = '/observations/search?query=temp:42.76&limit=250&';


const apiCredentials = 'client_id=bvpLuTRRLs5tMbTcMqmhm&client_secret=0Bpm48kezpufXqLX6UzBvpBSfkGG4zOH6b6CuUwj';

//const queryUrl = 'https://api.aerisapi.com/normals/closest?p=:auto&radius=100000miles&limit=100000&client_id=bvpLuTRRLs5tMbTcMqmhm&client_secret=0Bpm48kezpufXqLX6UzBvpBSfkGG4zOH6b6CuUwj';

const queryUrl = aerisApiBeginFixed + endPoint + apiCredentials;
console.log(queryUrl);

$.ajax({
    url: queryUrl,
    method: "GET"
}).then(function (response){
    console.log(response);
}).catch(function(error){
    console.log(error);
});

