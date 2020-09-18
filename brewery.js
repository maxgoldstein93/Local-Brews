$(document).ready(function () {
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
            $("#brewDump").empty();
            for (var i = 0; i < brewData.length; i++) {
                var lat = brewData[i].latitude;
                console.log(lat);
                var lon = brewData[i].longitude;
                console.log(lon);
                if(lon !== null && lat !== null){
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


                // display data dynamically for 5 day
                var card = $("<div>").addClass("card grid-x grid-margin-x small-up-2 medium-up-3");
                var dataSection = $("<div>").addClass("cell");
                card.append(dataSection);
                // fill it with data[i]
                var data = $("<h4>").text(brewName);
                dataSection.append(data)
                var data = $("<p>").text(brewCity);
                dataSection.append(data)
                var data = $("<p>").text(brewStreet);
                dataSection.append(data)
                var data = $("<p>").text(brewPhone);
                dataSection.append(data)
                var data = $("<p>").text(brewUrl);
                dataSection.append(data)
                var map = $("<div class='cell' id='map" + i + "' style='float: right; width: 250px; height: 250px;'></div>")
                card.append(map)
                // append that card to #5day

                $("#brewDump").append(card);

                
                    getMap(i, lon, lat)
                    console.log(i)

                }

                

            }

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