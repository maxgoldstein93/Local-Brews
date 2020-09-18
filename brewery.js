$(document).ready(function () {
    $("#search").on("click", function (event) {
        event.preventDefault();
        $("a").removeClass("hide");
        $("#searchFields").addClass("hide");
        getBrewery();
        $("#imgbackground").removeClass("hero-full-screen");
        $("#imgbackground").addClass("blackbackground");
    });

    function getBrewery() {
        var state = "Pennsylvania";
        var zipCode = $("#zipCode").val();
        var queryUrl = "https://api.openbrewerydb.org/breweries?by_postal=" + zipCode;
        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function (brewData) {
            if (brewData.length === 0) {
                var newDiv = $("<div>").addClass();
                var divMsg = $("<a>").text("Please enter a new zipcode there are no breweries in this area");
                divMsg.attr("href", "index.html");
                divMsg.css("font-size", "35px");
                newDiv.append(divMsg);
                $("#error").append(newDiv);
            } else if (zipCode === "" || zipCode.length < 5) {
                var newDiv = $("<div>").addClass();
                var divMsg = $("<a>").text("Please enter a valid zipcode");
                divMsg.attr("href", "index.html");
                divMsg.css("font-size", "35px");
                newDiv.append(divMsg);
                $("#error").append(newDiv);
                return
            };

            $("#brewDump").empty();
            for (var i = 0; i < brewData.length; i++) {
                var lat = brewData[i].latitude;
                var lon = brewData[i].longitude;
                if (lon !== null && lat !== null) {
                    var brewName = brewData[i].name;
                    var brewCity = brewData[i].city;
                    var brewStreet = brewData[i].street;
                    var brewUrl = brewData[i].website_url;
                    var brewPhone = brewData[i].phone;

                    var card = $("<div>").addClass("cell medium-4 large-4");
                    var dataSection = $("<div>").addClass("card");
                    card.append(dataSection);
                    var name = $("<h4>").addClass("card-divider text-center").text(brewName);
                    dataSection.append(name);
                    var street = $("<p>").text(brewStreet);
                    dataSection.append(street);
                    var city = $("<p>").text(brewCity);
                    dataSection.append(city);
                    var phone = $("<p>").text(brewPhone);
                    dataSection.append(phone);
                    var url = $("<a style='color: blue !important;' href=" + brewUrl + " target='_blank'>").text(brewUrl);
                    dataSection.append(url);
                    var map = $("<div id='map" + i + "' style='width: 300px; height: 250px; margin-bottom: 20px; margin-top: -20px'></div>");

                    card.append(map)
                    $("#brewDump").append(card);
                    getMap(i, lon, lat);
                };
            };

            function getMap(i, lon, lat) {
                mapboxgl.accessToken = 'pk.eyJ1IjoibWF4Z29sZHN0ZWluOTMiLCJhIjoiY2tmNWo0ajNmMDk2aTJxbzdnbmNlOHlpMiJ9.8CGYT2osEb9HFoXcKX93cw';
                var map = new mapboxgl.Map({
                    container: 'map' + i,
                    style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
                    center: [lon, lat], // starting position [lng, lat]
                    zoom: 9 // starting zoom
                });
                var geojson = {
                    type: 'FeatureCollection',
                    features: [{
                        type: 'Feature',
                        geometry: {
                            type: 'Point',
                            coordinates: [lon, lat]
                        },
                        properties: {
                            title: brewName,
                            description: brewCity
                        }
                    }]
                };
                // add markers to map
                geojson.features.forEach(function (marker) {
                    // create a HTML element for each feature
                    var el = document.createElement('div');
                    el.className = 'marker';
                    // make a marker for each feature and add to the map
                    new mapboxgl.Marker(el)
                        .setLngLat(marker.geometry.coordinates)
                    new mapboxgl.Marker(el)
                        .setLngLat(marker.geometry.coordinates)
                        .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
                            .setHTML('<h3>' + marker.properties.title + '</h3><p>' + marker.properties.description + '</p>'))
                        .addTo(map);
                });
            }
        });
    };
});