"use strict";


//alert("We have contact");

//Listening for a dropdown option to be selected
$('#sel1').on('change', function() {

    //Selected value is passed as a parameter to a switch
    switch(parseInt(this.value)){

        case 1:
            aerisAPIRequest(21.77);
            break;
        case 2:
            aerisAPIRequest(15);
            break;
        case 3:
            aerisAPIRequest(8);
            break;
        case 4:
            aerisAPIRequest(0);

    }

});

