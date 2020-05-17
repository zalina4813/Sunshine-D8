



$('document').ready(function () {

    $('#searchCity').keypress(function (e) {
        // Waiting for the user to press the enter key
        if (e.keyCode === 13) {
            console.log('blue')
            // This will clear the input field that the user typed into
            $('#city').val('')
        }

    })

    var modal = document.getElementById('id01');

    window.onclick = function (event) {
        // preventDefault();
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});




function displayRestaurants() {
    console.log('Im here');
    var search_rest_type = $(".search_rest_type").val();
    var search_rest_zip = $(".search_rest_zip").val();
    var settings = {
        "url": "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?categories=restaurants&term=" + search_rest_type + "&location=" + search_rest_zip,
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": "Bearer RbyX-dmkMHxvWjHEdJBshMdh3pj6Pd0e3IFg8l1C9oi3K6VS8IRi67-EKElLHLXtxedgbOhp06B2LMYXCdeIGf2JEmDbmLMmwc_50P77YlW1jYTiFaJQbUt9--u-XnYx",
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
        },
    };


    $.ajax(settings).then(function (response) {
        console.log(response);




        // Team: We tried to get the data to display on screen, but weren't successful. Below is the framework we started
        var results = response.businesses;


        for (var i = 0; i < results.length; i++) {

            // creating and storing a div tag


            // creating a paragraph tag with the result item's rating

            var p = $("<p>").text("Name: " + results[i].name);
            $(".content_display").append(p)
        }

        // console.log(location);
        // if (response.length < 0) {



    });






};
$(document).on("click", ".search-btn-rest", displayRestaurants);


// This function searches for activities 

function displayActivities() {
    console.log('Im here');
    var search_act_type = $(".search_act_type").val();
    var search_act_zip = $(".search_act_zip").val();
    var settings = {
        "url": "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?categories=active&term=" + search_act_type + "&location=" + search_act_zip,
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": "Bearer RbyX-dmkMHxvWjHEdJBshMdh3pj6Pd0e3IFg8l1C9oi3K6VS8IRi67-EKElLHLXtxedgbOhp06B2LMYXCdeIGf2JEmDbmLMmwc_50P77YlW1jYTiFaJQbUt9--u-XnYx",
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
        },
    };

    $.ajax(settings).done(function (response) {
        console.log(response);



    });



};
$(document).on("click", ".search-btn-act", displayActivities);