



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
        preventDefault();
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }




});




function displayRestaurants() {
    console.log('Im here');
    var settings = {
        "url": "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=Florida&term=restuarants",
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
$(document).on("click", ".search-btn", displayRestaurants);