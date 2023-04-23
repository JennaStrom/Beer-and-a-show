

var apiKey = "MBTqnGkdcHr9yyjvkUMAekQ48KJAGxYA";


var userSelection = document.getElementById('my-selection');
var userCitySearch = document.getElementById('city-search');
var searchButton = document.querySelector('#search-button')
var breweriesContainer = $('#brewery-container')
var eventsContainer = $('#event-container')
var allLinkWrapper = $('.allBrewLink')
var mainContentContainer = $('.mainContent-container ')
var allEvents = $('.allEvent')
var ContentContainer = $('#content-containers')

var userTargetService;
var city;

//
function displayAllResults() {
    city = userCitySearch.value.trim()
    userTargetService = userSelection.value.trim()

    if (!city) {
        return;
    }
    // if logic to display result based on the user selection

    if (userTargetService === 'events') {

        breweriesContainer.innerHTML = ''

        displayEvents()
        $('#content-containers').removeClass("lg:grid lg:grid-cols-2")
        $('#event-container').addClass("w-1/2")

    } else if (userTargetService === 'breweries') {

        // we can not clear this container, wh????????????????????????
        eventsContainer.innerHTML = ''

        displayBreweries()
        $('#content-containers').removeClass("lg:grid lg:grid-cols-2")
        $('#brewery-container').addClass("w-1/2")

        // $('#event-container').attr('class', 'border-none')
    } else if (userTargetService === 'both') {

        // eventsContainer.innerHTML = ''
        // breweriesContainer.innerHTML = ''

        displayEvents()
        displayBreweries()

        $('#event-container').removeClass("w-1/2")
        $('#brewery-container').removeClass("w-1/2")
        // $('#content-containers').addClass("lg:grid lg:grid-cols-2")

    } else {
        return
    }
}

//To enable the users change the selection without refreshing the page?? problem with removing events
$(userSelection).on('change', function () {

    searchButton.addEventListener('click', function (event) {
        event.preventDefault()
        displayAllResults()

    })

    document.addEventListener('keydown', function (event) {
        if (event.key == 13) {
            event.preventDefault()
            displayAllResults()

        }


    })

})

//
function displayEvents() {

    city = userCitySearch.value.trim()

    var eventHeading = $('<h2/>')
    eventHeading.text('Events Near Your Destination:')
    $('#event-h2-div').empty()
    $("#event-grid").addClass("border-x-4 px-4 border-white")
    $('#event-h2-div').append(eventHeading)
    $('#event-h2-div').attr("class", "my-4 w-full text-center underline-offset-8 text-2xl font-bold")

    fetch("https://app.ticketmaster.com/discovery/v2/events.json?&city=" + city + "&size=6&apikey=" + apiKey)
        .then(res => res.json())
        .then(data => {
            console.log(data)

            for (var i = 0; i < data._embedded.events.length; i++) {

                var eventName = data._embedded.events[i].name
                var eventImage = data._embedded.events[i].images[0].url
                var eventVenue = "Venue: " + data._embedded.events[i]._embedded.venues[0].name
                var eventDate = "Date: " + data._embedded.events[i].dates.start.localDate
                var eventUrl = data._embedded.events[i].url


                $("#event-name" + i).html(eventName + '')
                // $("#event-image"+i).html(" " +"<img src="+eventImage+">")
                // $("#event-image"+i).attr("class","w-32 h-32")
                $("#event-venue" + i).html(eventVenue + '')
                $("#event-date" + i).html(eventDate + '')
                $("#event-url" + i).html("<a href=" + eventUrl + ">" + "Click To Visit TicketMaster For This Event" + "</a>")
                $("#event" + i).css("background-image", "url(" + eventImage + ")")
                $("#event" + i).css("background-repeat", "no-repeat")
                $("#event" + i).css("background-color", "rgba(255, 255, 255, 0")
                $("#event" + i).css("background-size", "cover")
                $("#event" + i).css("font-weight", "bold")
                $("#event" + i).css("color", "white")
                $("#event" + i).css("textShadow", "black 4px 4px 4px")
                // $("#event"+i).attr("class", "bg-none p-10 rounded-2xl shadow-lg w-full md:w-1/2")
                $("#event-link" + i).attr("href", data._embedded.events[i].url)
                allEvents.show()

            }

        })
        // new -------------------------------------------------
        .catch(err => {
            console.log('This is is an error, ' + err)
            displayModal()
            eventsContainer.addClass('hidden')

        })

}
console.log(userCitySearch.value)

function displayBreweries() {


    city = userCitySearch.value.trim()
    console.log(city)
    var breweryHeading = $('<h2/>')
    $('#brewery-h2-div').empty()
    $('#brewery-h2-div').append(breweryHeading.text('Breweries Near Your Destination:'))
    $('#brewery-h2-div').attr("class", "my-4 w-full text-center underline-offset-8 text-2xl font-bold")
    $('#brewery-grid').addClass("border-x-4 border-white px-4")

    fetch('https://api.openbrewerydb.org/v1/breweries?by_city=' + city + '&per_page=6')
        .then(res => {
            if (res.ok) {
                res.json()
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
                            $("#website" + i).html("<a href=" + website + ">" + 'Click to visit Brewery Website')

                            $(allLinkWrapper[i]).attr('href', data[i].website_url)

                            allLinkWrapper.show()


                        }


                    })
            } else {
                var dataAvailability = $('<p/>')
                dataAvailability.text('Error: ' + res.statusText)
                $('#response-notification').html(dataAvailability)
            }
        })
        .catch(err => {

            console.log('This is is an error, ' + err)
            // new -------------------------------------------------
            displayModal()
            breweriesContainer.addClass('hidden')

        })


}


//new----------------------------Display the error message 
function displayModal() {
    var messageModal = $('#message-modal')

    var messageheading = document.querySelector('#msg-heading')

    messageheading.textContent = 'Error! unable to fetch the data requested.'

    var okButton = document.getElementById('ok-button')
    okButton.addEventListener('click', function () {
        messageModal.addClass('hidden')
    })
    messageModal.removeClass('hidden')


}

































