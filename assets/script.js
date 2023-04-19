

var apiKey = "MBTqnGkdcHr9yyjvkUMAekQ48KJAGxYA";

var city;
var userSelection = document.getElementById('my-selection');
var userCitySearch = document.getElementById('city-search');
var searchButton = document.querySelector('#search-button')
var breweriesContainer = document.getElementById('brewery-container')
var eventsContainer = document.getElementById('event-container')


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
    //displayBrewery()
    displayEvents()

    // displayThingsToDo()
})

// $("#search-button").on("click", displayEvents)
// searchButton.addEventListener('click', function (event) {
//     event.preventDefault()


//     userTargetService = userSelection.value.trim()
//     // breweriesContainer.innerHTML = ''
//     // eventsContainer.innerHTML = ''  // merged later
//     // if logic to display result based on the user selection

//     // if (userTargetService === 'breweries') {
//     //     displayBrewery()
//     // }else if (userTargetService === 'events') {
//     //     displayEvent()
//     // }else {
//     //     bothTargets()
//     // }
//     //displayEvents()
   
//     // displayThingsToDo()
// })

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
                
                //var reviewButton = document.createElement('button')

                //Assign the values extracted from the data to the variables created
                var name = 'Name: ' + data[i].name
                var type = 'Type: ' + data[i].brewery_type
                var address = 'Address: ' + data[i].address_1
                var phone = 'Phone: ' + data[i].phone
                var website = data[i].website_url

                //Append the 
                $("#name"+i).html(name + ' ')
                $("#type"+i).html(type + ' ')
                $("#address"+i).html(address + ' ')
                $("#phone"+i).html(phone + ' ')
                $("#website"+i).html("<a href="+website+">"+"Click here to visit Brewery Website")
                $("#brewery"+i).attr("class", "border-2 border-slate-950/50")
                //breweriesContainer.append(eachBreweryDiv, reviewButton)
                
               

                //eachBreweryDiv.classList.add("flex w-2/5")
                // eachBreweryDiv.setAttribute('style', 'border-style: solid')// no effect


                // reviewButton.addEventListener('click', function(){
                //     //fetch review of brewe
                // })

            }

        })
}

function displayEvents() {
    city = userCitySearch.value.trim()
    fetch("https://app.ticketmaster.com/discovery/v2/events.json?&city=" + city + "&size=5&apikey=" + apiKey)
        .then(res => res.json())
        .then(data => {
            console.log(data)

            for (var i = 0; i < data._embedded.events.length; i++) {
               
                var eventName = ''
                var eventImage = data._embedded.events[i].images[0].url
                var eventVenue = ''
                var eventDate = ''
                var eventUrl = data._embedded.events[i].url

                eventName = data._embedded.events[i].name
                // console.log("this")
                // console.log(eventName)
        
                eventVenue = "Venue: " + data._embedded.events[i]._embedded.venues[0].name
                eventDate = "Date: " + data._embedded.events[i].dates.start.localDate
            

                $("#event-name"+i).html(eventName + '')
                $("#event-image"+i).html(" " +"<img src="+eventImage+">")
                $("#event-image"+i).attr("class","w-32 h-32")
                $("#event-venue"+i).html(eventVenue + '')
                $("#event-date"+i).html(eventDate + '')
                $("#event-url"+i).html("<a href="+eventUrl+">"+"Click Here To Visit TicketMaster For This Event"+"</a>")
                $("#event"+i).attr("class", "border-2 border-slate-950/50")
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