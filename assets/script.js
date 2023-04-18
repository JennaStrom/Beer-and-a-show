

var apiKey = "MBTqnGkdcHr9yyjvkUMAekQ48KJAGxYA";


// // check in with openbrewery api
// var breweryApi_url = "https://api.openbrewerydb.org/v1/breweries?by_city=new york&per_page=6" //added the city search at the end and set it to show 6/search once we get the input info all set up "https://api.openbrewerydb.org/v1/breweries?by_city=" + cityName + "&per_page=6"
// fetch(breweryApi_url)
//     .then(res => res.json())
//     .then(data => console.log(data))

var city;
var userSelection = document.getElementById('my-selection');
var userCitySearch = document.getElementById('city-search');
var searchButton = document.querySelector('#search-button')
var breweriesContainer = document.getElementById('brewery-container')


// function initMap() {
//     var autoSearch = new google.maps.places.Autocomplete(userCitySearch)

//     userCitySearch.addEventListener('input', function(){
//         var inputType = {input: userCitySearch.value, types: ['(cities)']}

//         autoSearch.getPlacePredictions(inputType, function(){s})
//     })
// }



// function bothTargets () {
//     displayBrewery()
//     displayEvent()
//     displayThingsToDo()
// }


$("#search-button").on("click", displayBrewery)
searchButton.addEventListener('click', function (event) {
    event.preventDefault()


    userTargetService = userSelection.value.trim()
    // breweriesContainer.innerHTML = ''
    // eventsContainer.innerHTML = ''  // merged later
    // if logic to display result based on the user selection

    // if (userTargetService === 'breweries') {
    //     displayBrewery()
    // }else if (userTargetService === 'events') {
    //     displayEvent()
    // }else {
    //     bothTargets()
    // }
    displayBrewery()
    // displayThingsToDo()

})

city = userCitySearch.value.trim()
console.log(userCitySearch.value)
console.log (city)
function displayBrewery() {
    city = userCitySearch.value.trim()
    fetch('https://api.openbrewerydb.org/v1/breweries?by_city=' + city + '&per_page=5')
        .then(res => res.json())
        .then(data => {
            console.log(data)

            //To get five list of breweries in the selected city
            for (var i = 0; i < data.length; i++) {
                

                //Create DOM elements 
                //var eachBreweryDiv = document.createElement('div')
                var name = ''
                var type = ''
                var address = ''
                var phone = ''
                var website = ''
                //var reviewButton = document.createElement('button')

                //Assign the values extracted from the data to the variables created
                name = 'Name: ' + data[i].name
                type = 'Type: ' + data[i].brewery_type
                address = 'Address: ' + data[i].address_1
                phone = 'Phone: ' + data[i].phone
                website = 'Website: ' + data[i].website_url

                //Append the 
                $("#name"+i).html(name + ' ')
                $("#type"+i).html(type + ' ')
                $("#address"+i).html(address + ' ')
                $("#phone"+i).html(phone + ' ')
                $("#website"+i).html(website + ' ')
                //breweriesContainer.append(eachBreweryDiv, reviewButton)
                
               

                //eachBreweryDiv.classList.add("flex w-2/5")
                // eachBreweryDiv.setAttribute('style', 'border-style: solid')// no effect


                // reviewButton.addEventListener('click', function(){
                //     //fetch review of brewe
                // })

              
                



            }











        })
}


function displayThingsToDo (){

    https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&types=restaurant&name=harbour&key=YOUR_API_KEY

fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json')
    .then(res => res.json())
    .then(data => console.log(data))

}

// var customerReview;

//  customerReview.addEventListener ('click', function (){
//     displayReview()
//  })

// function displayReview () {

// }



























// // check in with ticketmaster api
// var ticketmasterUrl = "https://app.ticketmaster.com/discovery/v2/events.json?&city=minneapolis&size=6&apikey=" + APIKey;
// fetch(ticketmasterUrl)
//     .then(res => res.json())
//     .then(data => console.log(data))

    //things we should consider including...
    //_embedded.events[].name --will give the name of the show
    //_embedded.events[].dates.start.localDateTime --date and time of show
    //_embedded.events[].images[] --image will appear
    //_embedded.events[].url --link to get the tickets
    //_embedded.events[]._embedded.venues.name --will list name of venue

    //I think once we create a variable for the input information this is the url we should use for Ticketmaster..."https://app.ticketmaster.com/discovery/v2/events.json?&city=" + cityName + "&size=6&apikey=" + APIKey;