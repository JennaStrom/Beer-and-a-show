//A key for ticketMaster API
var apiKey = "MBTqnGkdcHr9yyjvkUMAekQ48KJAGxYA";

//Define variables and select DOM elements
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


//Display the result on the page
function displayAllResults() {

    //Assign users values to the variables
    city = userCitySearch.value.trim()
    userTargetService = userSelection.value.trim()

    //Check for the city input
    if (!city) {
        return;
    }

    // A logic to display the result based on the user target selection from the dropdown
    if (userTargetService === 'events') {

        displayEvents()

        //Add the class 'hidden' to the brewery container and removes it from the event if it exists
        $('#content-containers').removeClass("lg:grid lg:grid-cols-2")
        $('#event-container').addClass("w-1/2")
        $("#brewery-container").addClass('hidden')
        $("#event-container").removeClass('hidden')
    } else if (userTargetService === 'breweries') {

        displayBreweries()

        //Add the class 'hidden' to the event container and removes it from the brewery if it exists
        $('#content-containers').removeClass("lg:grid lg:grid-cols-2")
        $('#brewery-container').addClass("w-1/2")
        $("#event-container").addClass('hidden')
        $("#brewery-container").removeClass('hidden')


    } else if (userTargetService === 'both') {
        displayBreweries()
        displayEvents()
        // displayBreweries()

        // Removes the class 'hidden' from both containers if it exists 
        $('#content-containers').addClass("lg:grid lg:grid-cols-2")
        $("#event-container").removeClass('hidden')
        $("#brewery-container").removeClass('hidden')
        $('#event-container').removeClass("w-1/2")
        $('#brewery-container').removeClass("w-1/2")

    } else {
        return
    }
}

//Add the event listener to the selection dropdown
$(userSelection).on('change', function () {

    //Add event listener to the search button
    searchButton.addEventListener('click', function (event) {
        event.preventDefault()
        storeSearchData()
        displayAllResults()
    })

    //Add key event 
    document.addEventListener('keydown', function (event) {
        if (event.key == 13) {
            event.preventDefault()
            storeSearchData()
            displayAllResults()
        }
    })
})

//Fetch the events data and display the result
function displayEvents() {

    //A city entered by the user
    city = userCitySearch.value.trim()

    //Create an element and set classes to dynamically format the display result
    var eventHeading = $('<h2/>')
    eventHeading.text('Events Near Your Destination:')
    $('#event-h2-div').empty()
    $("#event-grid").addClass("border-x-4 px-4 border-white")
    $('#event-h2-div').append(eventHeading)
    $('#event-h2-div').attr("class", "my-4 w-full text-center underline-offset-8 text-2xl font-bold")

    //Fetch the events data from the ticketMaster api 
    fetch("https://app.ticketmaster.com/discovery/v2/events.json?&city=" + city + "&size=6&apikey=" + apiKey)
        .then(res => res.json())
        .then(data => {
            // console.log(data)

            //Iterate over the length of the available data to extract information about 6 events in a particular city
            for (var i = 0; i < data._embedded.events.length; i++) {

                //Genarate variables to hold the the extracted data
                var eventName = data._embedded.events[i].name
                var eventImage = data._embedded.events[i].images[0].url
                var eventVenue = "Venue: " + data._embedded.events[i]._embedded.venues[0].name
                var eventDate = "Date: " + data._embedded.events[i].dates.start.localDate
                var eventUrl = data._embedded.events[i].url

                //Display the data
                $("#event-name" + i).html(eventName + '')
                $("#event-venue" + i).html(eventVenue + '')
                $("#event-date" + i).html(eventDate + '')
                $("#event-url" + i).html("<a href=" + eventUrl + ">" + "Click To Visit TicketMaster For This Event" + "</a>")

                //Dynamically style the dispaly result 
                $("#event" + i).css("background-image", "url(" + eventImage + ")")
                $("#event" + i).css("background-repeat", "no-repeat")
                $("#event" + i).css("background-color", "rgba(255, 255, 255, 0")
                $("#event" + i).css("background-size", "cover")
                $("#event" + i).css("font-weight", "bold")
                $("#event" + i).css("color", "white")
                $("#event" + i).css("textShadow", "black 4px 4px 4px")
                $("#event-link" + i).attr("href", data._embedded.events[i].url)

                // Set the display property of show to the events container
                allEvents.show()
            }
        })

        //Handle error
        .catch(err => {
            // console.log('This is is an error fetching EVENTS data, ' + err)


            //Define variable to hold the error message
            var messageheading = document.querySelector('#msg-heading')
            messageheading.textContent = 'Error! unable to fetch the EVENTS data requested.' + err;

            //Set class to dynamically hide and display the two contaiers
            eventsContainer.addClass('hidden')
            breweriesContainer.removeClass('hidden')
            displayModal()
        })
}

//Fetch the events data and display the result
function displayBreweries() {

    //A city entered by the user
    city = userCitySearch.value.trim()

    //Create an element and set classes to dynamically format the display result
    var breweryHeading = $('<h2/>')
    $('#brewery-h2-div').empty()
    $('#brewery-h2-div').append(breweryHeading.text('Breweries Near Your Destination:'))
    $('#brewery-h2-div').attr("class", "my-4 w-full text-center underline-offset-8 text-2xl font-bold")
    $('#brewery-grid').addClass("border-x-4 border-white px-4")

    //Fetch breweries data from the openBrewerydb api 
    fetch('https://api.openbrewerydb.org/v1/breweries?by_city=' + city + '&per_page=6')
        .then(res => res.json())
        .then(data => {

            //Iterate over the length of the available data to extract information about 6 breweries in a particular city
            for (var i = 0; i < data.length; i++) {

                //Genarate variables to hold the the extracted data
                var name = 'Name: ' + data[i].name
                var type = 'Type: ' + data[i].brewery_type
                var address = 'Address: ' + data[i].address_1
                var phone = 'Phone: ' + data[i].phone
                var website = data[i].website_url

                //Inform users if the address of the brewery not found
                if (data[i].address_1 === null) {
                    address = "Adress: No Address Found"
                } else {
                    var address = 'Address: ' + data[i].address_1
                }

                //Inform users if the phone of the brewery not found
                if (data[i].phone === null) {
                    phone = "Phone: Not Found"
                }

                //Display the data
                $("#name" + i).html(name + ' ')
                $("#type" + i).html(type + ' ')
                $("#address" + i).html(address + ' ')
                $("#phone" + i).html(phone + ' ')
                $("#website" + i).html("<a href=" + website + ">" + 'Click to Visit Brewery Website For More Info')

                //Set each display boxes clickable
                $(allLinkWrapper[i]).attr('href', data[i].website_url)

                // Set the display property of show to the breweries container
                allLinkWrapper.show()
            }

        })
        // Handle error
        .catch(err => {

            // console.log('This is is an error fetching BREWERIES data, ' + err)

            //Define variable to hold the error message
            var messageheading = document.querySelector('#msg-heading')
            messageheading.textContent = 'Error! unable to fetch the BREWERIES data requested.' + err

            //Set class to dynamically hide and display the two contaiers
            breweriesContainer.addClass('hidden')
            eventsContainer.removeClass('hidden')

            displayModal()
        })

}

//Display the error modal  
function displayModal() {

    //Define variable to hold the error modal message
    var messageModal = $('#message-modal')
    var okButton = document.getElementById('ok-button')

    // Add the event listener to the error modal button
    okButton.addEventListener('click', function () {
        messageModal.addClass('hidden')
    })
    messageModal.removeClass('hidden')
}

//Store user data in local storage
function storeSearchData() {
    city = userCitySearch.value.trim()

    var storeData = JSON.parse(localStorage.getItem('userInput')) || []
    if (!storeData.some(element => {
        return element.toLowerCase() === city.toLowerCase()
    })) {
        storeData.push(city)
    }
    localStorage.setItem('userInput', JSON.stringify(storeData))
}

































