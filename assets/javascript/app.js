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

    $('.chooseHere').on('click', function() {

        $('.centerchosenText').hide();
        window.onclick = function (event) {

            // preventDefault();
            if (event.target == modal) {
                modal.style.display = "none";
                $('.centerchosenText').show();
            }

        }

    })

    // When the x inside the modal is clicked, the text from before is shown
    $('.close').on('click', function() {

        $('.centerchosenText').show();

    })

    // ------------------------ Password Requirements -----------------------------

    // This will make the password requirements hidden by default
    $('#PasswordReqs').hide();
    $('#PasswordInput').on('click', function () {

        // This will show the user the password requirements when they click on the password box
        $('#PasswordReqs').show()

    })

    $('#PasswordVerify, #EmailInput').on('click', function () {

        // This will hide the password requirements when they click out of the password box
        $('#PasswordReqs').hide()

    })

    // ------------------------ Restaurants ----------------------------

    // grab the restaurant type and the zip code from the query strings in the url
    var foodType = getQueryVariable('search_rest_type');
    var zipCode = getQueryVariable('search_rest_zip');

    //we pass in the settings that come from the build settings function and pass it into an ajax call.
    //then we wait for the response to come back before displaying the restaurant list;
    $.ajax(buildSettingsForRestaurantSearch(foodType, zipCode)).then(function (response) {

        //using the response list, we build a list of restaurants and put them in an un-ordered list.
        var listOfRestaurants = buildRestaurantList(response.businesses);

        //once we have the list of restaurants, we append them to the display div. 
        //But first we have to empty the previous list in the display div

        console.log(response.businesses)

    });

    // This function will build ajax settings to be used on the yelp api for a requested restaurant type in a specific zipcode.
    // we pass the food type and zipcode in as parameters
    // this function uses will then return an appropriate settings object for our ajax call to yelp
    function buildSettingsForRestaurantSearch(foodType, zipCode) {

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

    // using a list of restaurants from the yelp api, we will display a list of restaurants on the search page for restaurants.
    function buildRestaurantList(list) {

        for (var i = 0; i < list.length; i++) {

            // This function will make it so the text that's generated to the containing div
            // isn't all mushed together
            function linebreaks() {

                var linebreaks = document.createElement('br');
                containing.append(linebreaks);

            }

            // This is what everything is appended to so that it can be sent to the webpage
            var containing = $('<div>').addClass('row1');

            // This adds the images that Yelp provides
            var image = document.createElement('img');
            image.src = list[i].image_url;
            containing.append(image);

            // Appends the containing div to the div with the id stated below
            $('#restaurant-list').append(containing);

            // This will add the names of the restaurants in the users area
            var restaurantName = document.createElement('div');
            restaurantName = list[i].name;
            containing.append(restaurantName).addClass('bluu');

            linebreaks();

            var restaurantAddress = document.createElement('div');
            restaurantAddress = list[i].location.display_address;
            containing.append('Address: ' + restaurantAddress);

            linebreaks();

            var restaurantNumber = document.createElement('div');
            restaurantNumber = list[i].display_phone;
            containing.append('Phone Number: ' + restaurantNumber);

            linebreaks();

            var restaurantRating = document.createElement('div');
            restaurantRating = list[i].rating;
            containing.append('Rating: ' + restaurantRating + ' stars');

            linebreaks();

            // Creates a link for the user to click on to bring them to the review page
            // https://www.geeksforgeeks.org/how-to-create-a-link-in-javascript/
            YelpReviewPageURL = list[i].url;

            // Create anchor element. 
            var YelpReview = document.createElement('a');

            // Create the text node for anchor element. 
            var link = document.createTextNode("Click Here to See Reviews");

            // Append the text node to anchor element. 
            YelpReview.appendChild(link);

            // Set the title. 
            YelpReview.title = "Click Here to See Reviews";

            // Set the href property. 
            YelpReview.href = YelpReviewPageURL;

            // Review Page will open up on another tab when the link is clicked
            YelpReview.target = ('_blank')

            // Append the anchor element to the body. 
            containing.append(YelpReview);

        }

        return;

    }

    // ------------------------ Activities -------------------------------
    // / grab the activity type and the zip code from the query strings in the url
    var actType = getQueryVariable('search_act_type');
    var zipCode = getQueryVariable('search_act_zip');

    //we pass in the settings that come from the build settings function and pass it into an ajax call.
    //then we wait for the response to come back before displaying the activity list;
    $.ajax(buildSettingsForActivitySearch(actType, zipCode)).then(function (response) {

        //using the response list, we build a list of activities and put them in an un-ordered list.
        var listOfActivities = buildActivityList(response.businesses);

        //once we have the list of activities, we append them to the display div. 
        //But first we have to empty the previous list in the display div

        console.log(response.businesses);
        console.log("hello");


    });

    // This function will build ajax settings to be used on the yelp api for a requested activity type in a specific zipcode.
    // we pass the activity type and zipcode in as parameters
    // this function uses will then return an appropriate settings object for our ajax call to yelp
    function buildSettingsForActivitySearch(actType, zipCode) {

        var settings = {
            "url": "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?categories=active&term=" +
                actType + "&location=" + zipCode + "&limit=10",
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



    function buildActivityList(list) {

        for (var i = 0; i < list.length; i++) {

            // This function will make it so the text that's generated to the containing div
            // isn't all mushed together
            function linebreaks() {

                var linebreaks = document.createElement('br');
                containing.append(linebreaks);

            }

            // This is what everything is appended to so that it can be sent to the webpage
            var containing = $('<div>').addClass('row1');

            // This adds the images that Yelp provides
            var image = document.createElement('img');
            image.src = list[i].image_url;
            containing.append(image);

            // Appends the containing div to the div with the id stated below
            $('#activity-list').append(containing);

            // This will add the names of the restaurants in the users area
            var actName = document.createElement('div');
            actName = list[i].name;
            containing.append(actName).addClass('bluu');

            linebreaks();

            var actAddress = document.createElement('div');
            actAddress = list[i].location.display_address;
            containing.append('Address: ' + actAddress);

            linebreaks();

            var actNumber = document.createElement('div');
            actNumber = list[i].display_phone;
            containing.append('Phone Number: ' + actNumber);

            linebreaks();

            var actRating = document.createElement('div');
            actRating = list[i].rating;
            containing.append('Rating: ' + actRating + ' stars');

            linebreaks();

            // Creates a link for the user to click on to bring them to the review page
            // https://www.geeksforgeeks.org/how-to-create-a-link-in-javascript/
            YelpReviewPageURL = list[i].url;

            // Create anchor element. 
            var YelpReview = document.createElement('a');

            // Create the text node for anchor element. 
            var link = document.createTextNode("Click Here to See Reviews");

            // Append the text node to anchor element. 
            YelpReview.appendChild(link);

            // Set the title. 
            YelpReview.title = "Click Here to See Reviews";

            // Set the href property. 
            YelpReview.href = YelpReviewPageURL;

            // Review Page will open up on another tab when the link is clicked
            YelpReview.target = ('_blank')

            // Append the anchor element to the body. 
            containing.append(YelpReview);

        }

        return;

    }


    



});

//this function validates that the restaurant search fields are populated before
//submitting the restaurant search form
function validateRestaurantForm() {
    
    //find the search fields in the search form for restaurants, then check that the value
    //of that search field is not empty. If any of them are empty, alert the user, return to the form and do not submit 
    // the form.
    var searchRestType = document.forms["rest_search_form"]["search_rest_type"].value;
    if (searchRestType == "") {
        alert("Please fill out restaurant type");
        return false;
    }   

    var searchRestZip = document.forms["rest_search_form"]["search_rest_zip"].value;
    if (searchRestZip == "") {
        alert("Please fill out restaurant zip code");
        return false;
    }   

    // If the search fields are properly filled out, find the search form and submit.
    var searchForm = document.forms["rest_search_form"];
    searchForm.submit();
}

// This function validates that the activities fields are filled out properly.
function validateActivitiesForm() {
    
    //Check the activities search type field and make sure it's not empty.
    var searchRestType = document.forms["search_act_form"]["search_act_type"].value;
    if (searchRestType == "") {
        alert("Please fill out activity type");
        return false;
    }   

    //check the activities zip code and make sure it's not empty.
    var searchRestZip = document.forms["search_act_form"]["search_act_zip"].value;
    if (searchRestZip == "") {
        alert("Please fill out activity zip code");
        return false;
    }   

    //if all fields were filled out correctly, find the form and submit it.
    var searchForm = document.forms["search_act_form"];
    searchForm.submit();
}
