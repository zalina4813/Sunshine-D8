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
        "url": "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?categories=restaurants&term=" + foodType + "&location=" + zipCode,
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

    var ul = $('ul');
    for(var i = 0; i < list.length; i++) {
        var restaurant = ul.append('<li>'+list[i].name+'</li>')
    }
    return ul;
}

