function getBrewery(){
    var state = "Pennsylvania"
    var zipcode = "15234"
    var queryUrl = "https://api.openbrewerydb.org/breweries?by_postal=" + zipcode
    // if(state !== "")
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function (brewData) {
        console.log(brewData)
        
    });

    
};
getBrewery()

