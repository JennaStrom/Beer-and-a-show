console.log("I'm connected")


// check in with openbrewery api
var breweryApi_url = "https://api.openbrewerydb.org/v1/breweries"
fetch (breweryApi_url)
.then(res => res.json())
.then(data => console.log(data))

// check in with ticketmaster api