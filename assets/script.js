console.log("I'm connected")
var cityName //city entered into the search input
var APIKey = "MBTqnGkdcHr9yyjvkUMAekQ48KJAGxYA";

// check in with openbrewery api
var breweryApi_url = "https://api.openbrewerydb.org/v1/breweries?by_city=minneapolis&per_page=6" //added the city search at the end and set it to show 6/search once we get the input info all set up "https://api.openbrewerydb.org/v1/breweries?by_city=" + cityName + "&per_page=6"
fetch (breweryApi_url)
.then(res => res.json())
.then(data => console.log(data))

//things to inlcude...
//name
//address_1 (just does the street address which seems like enough since you are the one that searched the city?)
//brewery_type
//phone
//website_url


// check in with ticketmaster api
    var ticketmasterUrl = "https://app.ticketmaster.com/discovery/v2/events.json?&city=minneapolis&size=6&apikey=" + APIKey;
    fetch (ticketmasterUrl)
    .then(res => res.json())
    .then(data => console.log(data))

    //things we should consider including...
    //_embedded.events[].name --will give the name of the show
    //_embedded.events[].dates.start.localDateTime --date and time of show
    //_embedded.events[].images[] --image will appear
    //_embedded.events[].url --link to get the tickets
    //_embedded.events[]._embedded.venues.name --will list name of venue

    //I think once we create a variable for the input information this is the url we should use for Ticketmaster..."https://app.ticketmaster.com/discovery/v2/events.json?&city=" + cityName + "&size=6&apikey=" + APIKey;