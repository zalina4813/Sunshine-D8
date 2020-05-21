$('document').ready(function () {

//  -------------------- Search Bar ---------------------------

$('#searchCity').keypress(function (e) {
    // Waiting for the user to press the enter key
    if (e.keyCode === 13) {
        console.log('blue')
        // This will clear the input field that the user typed into
        $('#city').val('')
    }

})
// ------------------------ Modal -----------------------------

var modal = document.getElementById('id01');

window.onclick = function (event) {
    // preventDefault();
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// ------------------------ Password Requirements -----------------------------

// This will make the password requirements hidden by default
$('#PasswordReqs').hide();
$('#PasswordInput').on('click', function() {

    // This will show the user the password requirements when they click on the password box
    $('#PasswordReqs').show()

})

$('#PasswordVerify, #EmailInput').on('click', function() {

    // This will hide the password requirements when they click out of the password box
    $('#PasswordReqs').hide()

})

// ------------------------ Restaurants ----------------------------

// grab the restaurant type and the zip code from the query strings in the url
var foodType = getQueryVariable('search_rest_type');
var zipCode = getQueryVariable('search_rest_zip');


//we pass in the settings that come from the build settings function and pass it into an ajax call.
//then we wait for the response to come back before displaying the restaurant list;
$.ajax(buildSettingsForRestaurantSearch(foodType, zipCode)).then(function(response) {
        
    //using the response list, we build a list of restaurants and put them in an un-ordered list.
    var listOfRestaurants = buildRestaurantList(response.businesses);

    //once we have the list of restaurants, we append them to the display div. 
    //But first we have to empty the previous list in the display div

    $('restaurant-list').empty();

    // then we append the new list
    $('#restaurant-list').append(listOfRestaurants);

    console.log(response.businesses)

});

// stackoverflow https://stackoverflow.com/questions/2090551/parse-query-string-in-javascript
// this function will parse a query string parameter from the url and return the data of that parameter to you
function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');

    for (var i = 0; i < vars.length; i++) {

        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {

            return decodeURIComponent(pair[1]);

        }

    }
    console.log('Query string paramter %s not found', variable);
}

// This function will build ajax settings to be used on the yelp api for a requested restaurant type in a specific zipcode.
// we pass the food type and zipcode in as parameters
// this function uses will then return an appropriate settings object for our ajax call to yelp
function buildSettingsForRestaurantSearch(foodType, zipCode) {
    

    console.log('Im here'); // will be removed later. just testing the code executes
    
    var settings = {
        "url": "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?categories=restaurants&term=" + 
        foodType + "&location=" + zipCode + "&limit=10",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": "Bearer RbyX-dmkMHxvWjHEdJBshMdh3pj6Pd0e3IFg8l1C9oi3K6VS8IRi67-EKElLHLXtxedgbOhp06B2LMYXCdeIGf2JEmDbmLMmwc_50P77YlW1jYTiFaJQbUt9--u-XnYx",
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
        },
    };

    return settings;
}

// using a list of restaurants from the yelp api, we will display a list of restaurants on the search page for restaurants.
function buildRestaurantList(list) {

    var ul = $('<div>');
    for(var i = 0; i < list.length; i++) {

        // This will add the names of the restaurants in the users area
        var name = ul.append(list[i].name)
        // This adds the images that Yelp provides
        // var images= document.createElement('img')
        // images.src= list[i].image_url
        // var imageslist= ul.append(images)
        
    }

    return ul;
    
}

// ------------------------ Activities ----------------------------



});