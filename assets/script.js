

var apiKey = "MBTqnGkdcHr9yyjvkUMAekQ48KJAGxYA";


// // check in with openbrewery api
// var breweryApi_url = "https://api.openbrewerydb.org/v1/breweries?by_city=new york&per_page=6" //added the city search at the end and set it to show 6/search once we get the input info all set up "https://api.openbrewerydb.org/v1/breweries?by_city=" + cityName + "&per_page=6"
// fetch(breweryApi_url)
//     .then(res => res.json())
//     .then(data => console.log(data))

var city;
var userSelection = document.getElementById('my-selection');
var userCitySearch = document.getElementById('city-search');
var searchButton = document.getElementById('search-button')
var breweriesContainer = document.getElementById('brewery-container')
var eventsContainer = document.getElementById('brewery-container')




 function hitSearch  (){
    searchButton.addEventListener('click', function (event) {
    event.preventDefault()

    userTargetService = userSelection.value.trim()
    // breweriesContainer.innerHTML = ''
    eventsContainer.innerHTML = ''  // merged later

    // if logic to display result based on the user selection ?????

    if (userTargetService === 'breweries') {
        displayBrewery()
    }else if (userTargetService === 'events') {
        displayEvent()
    }else {
        displayBrewery()
        // displayEvent()
    }

    // displayThingsToDo()
})
}
    

function initMap() {
    var autoSearch = new google.maps.places.Autocomplete(userCitySearch)

    var myMap = new google.maps.Map (document.createElement('div'), {
        zoom: 8,
        centre: {lat:44.9778,lng: 93.2650 } //make Minneapolis our default
    })

    userCitySearch.addEventListener('input', function(){
        
        hitSearch()
    })
}


function displayBrewery() {

    city = userCitySearch.value.trim()

    fetch('https://api.openbrewerydb.org/v1/breweries?by_city=' + city + '&per_page=5')
        .then(res => res.json())
        .then(data => {
            console.log(data)

            //To get five list of breweries in the selected city
            for (var i = 0; i < data.length; i++) {
                

                //Create DOM elements 
                var eachBreweryDiv = document.createElement('div')
                var name = document.createElement('p')
                var type = document.createElement('p')
                var address = document.createElement('p')
                var phone = document.createElement('p')
                var website = document.createElement('p')
                var reviewButton = document.createElement('button')

                //Assign the values extracted from the data to the variables created
                name.textContent = 'Name: ' + data[i].name
                type.textContent = 'Type: ' + data[i].brewery_type
                address.textContent = 'Address: ' + data[i].address_1
                phone.textContent = 'Phone: ' + data[i].phone
                website.textContent = 'Website: ' + data[i].website_url

                //Append the 
                eachBreweryDiv.append(name, type, address,  phone,  website)
                breweriesContainer.append(eachBreweryDiv, reviewButton)
               

               
              
                



            }











        })
 hitSearch()

}



{/* <script>
  (g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})({
    key: "YOUR_API_KEY_HERE",
    // Add other bootstrap parameters as needed, using camel case.
    // Use the 'v' parameter to indicate the version to load (alpha, beta, weekly, etc.)
  });
</script> */}


// function displayThingsToDo (){

//    

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