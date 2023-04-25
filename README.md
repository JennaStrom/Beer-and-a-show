# Beer and a Show

## Description
This application uses the Ticketmaster API and the Open Brewery API to help you plan your night out! With just one search you will receive results for events in that city as well as some breweries you may want to stop by before the show! 

The application takes user inputs on the type of information the use would like to see (events/breweries/both) and a user input city to fetch information from the appropriate API's to generate recommendations.

Future development plans include adding the option for the user to select date ranges for their trips and a budget option. At this time the application is intended for last minute plans.


## User Story

As a customer who love beer and show,
I WANT to know the upcoming events and breweries in a particular city  
SO THAT I can plan my leisure time

## Acceptance Criteria

GIVEN an application that provides select search and form inputs
WHEN I search for a city
THEN I am provided with the upcoming events with information that includes venue, artists, and bands.
WHEN I search for a city,
THEN I am presented with breweries in the city with information about name, address, type, and website of each brewery.
WHEN I click a specific event box,
THEN I am directed to the web site of its respective host.
WHEN I click a web site address of the specific brewery,
THEN I am directed to the respective site.

## Usage
To use this application, navigate to the link in the next section. You should be greeted with a landing page like you see below.

<img width="1420" alt="Screenshot 2023-04-23 at 2 28 54 PM" src="https://user-images.githubusercontent.com/123525191/233860827-17856a08-3a8f-4cb1-9792-7933c2a6c925.png">

Once you have landed on the site, select from the drop down menu whether you would like to search for Events, Breweries, or Both. Next, enter the city you would like to receive recommendations for. Once you submit your selections, the appropriate API's will be called and display information on upcoming events and/or local breweries for your city. Clicking on the cards that are generated will bring you to a ticketmaster page (for the events portion), or to the website of the brewery.

Attempting to pull up information for the same city over and over may result in an error from the API's. In this case, a modal will pop up informing you that an error has occured. If the error message persists, you may need to refresh the page.

You can change your selections after you have generated your recommendations (i.e. you can select breweries only, then decide you actually wanted to view both breweries and events). By changing your selection from the drop down menu and re-submitting your selections, the results will update appropriately.


## Link to Website
[https://jennastrom.github.io/Beer-and-a-show/]

## Screenshot

## Authors 
Created by: Nafbek Kebede ([github.com/Nafbek]), Nick Reece ([github.com/nreece6]), and Jenna Strom ([github.com/JennaStrom]).

### Acknowledgement 

The developers of this web app would like to express their gratitude to everyone who supported us with their ideas.

## Resources
Balsamic used to wireframe the application [https://balsamiq.com/wireframes/?gclid=CjwKCAjw0N6hBhAUEiwAXab-TWKJB0yKqeJ_7Tdte4Hyz4W6o555mul9YcD4LX8WnNZJ7LODT6RMoBoCd1YQAvD_BwE]

Stock Brewery Images from [https://www.pexels.com/search/brewery/] & [https://unsplash.com/s/photos/brewery]

Ticketmaster API [https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/]

Open Brewery DB API [https://www.openbrewerydb.org/]
