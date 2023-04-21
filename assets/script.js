

var apiKey = "MBTqnGkdcHr9yyjvkUMAekQ48KJAGxYA";


var userSelection = document.getElementById('my-selection');
var userCitySearch = document.getElementById('city-search');
var searchButton = document.querySelector('#search-button')
var breweriesContainer = document.getElementById('brewery-container')
var eventsContainer = $('event-xontaine')
var allLinkWrapper = $('.allBrewLink')
var mainContentContainer = $('.mainContent-container ')
var allEvents = $('.allEvent')

var userTargetService;
var city;




// $("#search-button").on("click", displayBrewery)
// $("#search-button").on("click", displayEvents)


// $('#my-selection').on('onchange', function (){

// })
// userSelection.addEventListener('onchange', function ()
// // {




searchButton.addEventListener('click', function (event) {
    event.preventDefault()
    // city = userCitySearch.value.trim()
    var userTargetService = userSelection.value.trim()
    console.log('inside click')
console.log(userTargetService)
    // breweriesContainer.innerHTML = ''

    // if logic to display result based on the user selection


    if (userTargetService === 'breweries' || userTargetService === 'both') {
        displayBreweries()
    } else if (userTargetService === 'events' || userTargetService === 'both') {
        displayEvents()
        console.log()
    } else {
        displayBreweries()
        displayEvents()

    }
    

})

document.addEventListener('keydown', function(event){
    if (event.key ==13){
        event.preventDefault()
        var userTargetService = userSelection.value.trim()

        console.log(userTargetService)
    // breweriesContainer.innerHTML = ''

    // if logic to display result based on the user selection


    if (userTargetService === 'only breweries' || userTargetService === 'both events and breweries') {
        displayBreweries()
    } else if (userTargetService === 'only events' || userTargetService === 'both events and breweries') {
        displayEvents()
        console.log()
    } else {
        displayBreweries()
        displayEvents()

    }
    }
//    mainContentContainer.show()
})


// $("#search-button").on("click", displayEvents)
// searchButton.addEventListener('click', function (event) {
//     event.preventDefault()


//     userTargetService = userSelection.value.trim()
//     // breweriesContainer.innerHTML = ''
//     // eventsContainer.innerHTML = ''  // merged later

// })

// #event-container, #brewery-container



function displayEvents() {
    city = userCitySearch.value.trim()
    fetch("https://app.ticketmaster.com/discovery/v2/events.json?&city=" + city + "&size=6&apikey=" + apiKey)
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
                // $("#event-image"+i).html(" " +"<img src="+eventImage+">")
                // $("#event-image"+i).attr("class","w-32 h-32")
                $("#event-venue"+i).html(eventVenue + '')
                $("#event-date"+i).html(eventDate + '')
                $("#event-url"+i).html("<a href="+eventUrl+">"+"Click To Visit TicketMaster For This Event"+"</a>")
                $("#event"+i).css("background-image", "url("+eventImage+")")
                $("#event"+i).css("background-repeat", "no-repeat")
                $("#event"+i).css("background-color", "rgba(255, 255, 255, 0")
                $("#event"+i).css("background-size", "cover")
                $("#event"+i).css("font-weight", "bold")
                $("#event"+i).css("color", "white")
                $("#event"+i).css("textShadow", "black 4px 4px 4px")
                // $("#event"+i).attr("class", "bg-none p-10 rounded-2xl shadow-lg w-full md:w-1/2")
                $("#event-link"+i).attr("href", data._embedded.events[i].url)
                allEvents.show()
                
            }
        })
}
console.log(userCitySearch.value)

function displayBreweries() {

    city = userCitySearch.value.trim()
    console.log(city)


    fetch('https://api.openbrewerydb.org/v1/breweries?by_city=' + city + '&per_page=6')
        .then(res => res.json())
        .then(data => {
            console.log(data)

            //To get five list of breweries in the selected city
            for (var i = 0; i < data.length; i++) {


                //Assign the values extracted from the data to the variables created
                var name = 'Name: ' + data[i].name
                var type = 'Type: ' + data[i].brewery_type
                var address = 'Address: ' + data[i].address_1
                var phone = 'Phone: ' + data[i].phone
                var website = data[i].website_url

               if (data[i].address_1 === null) {
                address = "Adress: No Address Found"
               } else {
                var address = 'Address: ' + data[i].address_1
               }



                //Append the 
                $("#name" + i).html(name + ' ')
                $("#type" + i).html(type + ' ')
                $("#address" + i).html(address + ' ')
                $("#phone" + i).html(phone + ' ')
                $("#website" + i).html('Click to visit Brewery Website')

                $(allLinkWrapper[i]).attr('href', data[i].website_url)

                allLinkWrapper.show()


            

              

//  var myCard = $('.bg-none')

// myCard.css('background-size', 'cover')

        }
})
}




// function displayThingsToDo (){

//     // https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&types=restaurant&name=harbour&key=YOUR_API_KEY

// fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json')
//     .then(res => res.json())
//     .then(data => console.log(data))

// }

// var customerReview;

//  customerReview.addEventListener ('click', function (){
//     displayReview()
//  })

// function displayReview () {

// }

























