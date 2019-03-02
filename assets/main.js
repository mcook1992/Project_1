"use strict";

//alert("We have contact");

var maxTemp = 0;


//Listening for a dropdown option to be selected
$('#sel1').on('change', function() {

    //Taking the value of the User Selection and parsing it into an Int
    var userInput = parseInt(this.value);


    //Setting Min Max For each Category
    if(userInput === 1){
        maxTemp = 35;
    }
    if(userInput === 2){
        maxTemp = 23.8889;
    }
    if(userInput === 3){
        maxTemp = 18.3333;
    }
    if(userInput === 4){
        maxTemp = 1.67;
    }
    if(userInput === 5){
        maxTemp = -7.77778;
    }

    //Selected value is passed as a parameter to a switch
    switch(userInput){

        case 1:
            aerisAPIRequest(26.67, -1, maxTemp);
            break;
        case 2:
            aerisAPIRequest(21, 9, maxTemp);
            break;
        case 3:
            aerisAPIRequest(12.78,999, maxTemp);
            break;
        case 4:
            aerisAPIRequest(-1.1, 999, maxTemp);
        case 5:
            aerisAPIRequest(-12.22, 999, maxTemp);

    }

});


//Hot = 80-95
//Warm = 70-75
//cool = 55-65
//cold = 30-35
//Freezing = 10-18


//TODO; Sort data and exclude items Display on frontend
