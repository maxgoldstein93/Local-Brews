$(document).ready(function () {
    getMap()
    $("#search").on("click", function (event) {
        event.preventDefault();
        var inputEl = document.getElementById("searchFields");
        inputEl.style.display = "none";
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
            for (var i = 0; i < brewData.length; i++) {
                var brewName = brewData[i].name;
                console.log(brewName)
                var brewCity = brewData[i].city;
                console.log(brewCity)
                var brewStreet = brewData[i].street;
                console.log(brewStreet)
                var brewUrl = brewData[i].website_url
                console.log(brewUrl)
                var brewPhone = brewData[i].phone;
                console.log(brewPhone);
                var lat = brewData[i].latitude;
                console.log(lat);
                var lon = brewData[i].longitude;
                console.log(lon);

                // display data dynamically for 5 day
                var card = $("<div>").addClass("card");
                // fill it with data[i]
                var data = $("<h5>").text(brewName);
                card.append(data)
                var data = $("<p>").text(brewCity);
                card.append(data)
                var data = $("<p>").text(brewStreet);
                card.append(data)
                var data = $("<p>").text(brewPhone);
                card.append(data)
                var data = $("<p>").text(brewUrl);
                card.append(data)

                // append that card to #5day

                $("#brewDump").append(card);




            }



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