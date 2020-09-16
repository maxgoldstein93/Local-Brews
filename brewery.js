$(document).ready(function () {
    getMap()
    $("#search").on("click", function (event) {
        event.preventDefault();
        getBrewery();
    });

    function getBrewery() {
        var state = "Pennsylvania"
        var zipCode = $("#zipCode").val();
        console.log(zipCode)
        var queryUrl = "https://api.openbrewerydb.org/breweries?by_postal=" + zipCode
        // if(state !== "")
        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function (brewData) {
            console.log(brewData)

        });

    };

    function getMap() {
        mapboxgl.accessToken = 'pk.eyJ1IjoibWF4Z29sZHN0ZWluOTMiLCJhIjoiY2tmNWo0ajNmMDk2aTJxbzdnbmNlOHlpMiJ9.8CGYT2osEb9HFoXcKX93cw';
        var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
            center: [-74.5, 40], // starting position [lng, lat]
            zoom: 9 // starting zoom
        });
    }
    


});
