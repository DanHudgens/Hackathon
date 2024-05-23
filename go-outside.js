//create some sort of entry form to get location from user
//user specifies their desired conditions
//if those conditions match the current weather
//have another popup that says go outside
// const zipCode =

// let zipURL = `actualURL/${zipCode}`

// fetch(url)
// .then() {

// app.js

// Function to handle form submission
// function handleFormSubmit(event) {
//   alert('works?');
//   event.preventDefault(); // Prevent the default form submission

//   // Get the form element
//   const form = document.querySelector('#myForm');

//   // Create a FormData object from the form
//   const formData = new FormData(form);

//   // Extract form data
//   const data = {};
//   formData.forEach((value, key) => {
//     data[key] = value;
//   });

//   // Store data (example: local storage or console)
//   console.log(data); // For demonstration purposes
//   alert(data);

//   // If storing in local storage
//   localStorage.setItem('formData', JSON.stringify(data));
// }

// Add event listener to the form
//document.getElementById('myForm').addEventListener('submit', handleFormSubmit);

//make new object to store user input
const ourData = {};

document.getElementById('myForm').addEventListener('submit', () => {
  event.preventDefault(); // Prevent the default form submission

  let input = document.querySelector('#myForm');
  const formData = new FormData(input);

  for (const pair of formData.entries()) {
    ourData[pair[0]] = pair[1];
  }

  apiCall(ourData.zipcode);

  // for (let key in ourData) {
  //   alert(key);
  // }
});

function apiCall(zipcode) {
  const myZip = `https://api.openweathermap.org/data/2.5/weather?zip=${zipcode},us&appid=ca0cc8d2c9c52af26171b1bdeb0d4787`;
  //create a url template literal
  //make our fetch call
  let localTemp;
  let localRain;
  let localGust;
  fetch(myZip) // returns json string
    .then((data) => data.json()) // returns JS object
    .then((data) => {
      localTemp = (data.main.temp - 273.15) * 1.8 + 32; // calc F from K
      // localRain = data.rain['1h'];
      // localGust = data.wind.gust;
      //check to see if temp is within desired range from user //min-temp //max-temp
      if (
        localTemp >= ourData['min-temp'] &&
        localTemp <= ourData['max-temp']
      ) {
        alert('Go Outside!');
      }
    })
    .catch(() => {
      alert('query failed');
    });
  //recall api after 15 min
  //setInterval(apiCall(zipcode), 900000);
}

//keys and values are properties on the formData object

// Extract form data
// const data = {};
// formData.forEach((value, key) => {
//   alert('fmkqwr');
//   data[key] = value;
//   console.log(value);
// });

//make it so that it only popups every so often

//temperature
//sunny/cloudy/rainy
//wind

// {
//   "name": "Drink Water Event Popup",
//   "description": "Demonstrates usage and features of the event page by reminding user to drink water",
//   "version": "1.0",
//   "manifest_version": 3,
//   "permissions": ["alarms", "notifications", "storage"],
//   "background": {
//     "service_worker": "background.js"
//   },
//   "action": {
//     "default_title": "Drink Water Event",
//     "default_popup": "popup.html"
//   },
//   "icons": {
//     "16": "drink_water16.png",
//     "32": "drink_water32.png",
//     "48": "drink_water48.png",
//     "128": "drink_water128.png"
//   }
// }
