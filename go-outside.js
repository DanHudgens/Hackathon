//create entry form to get location from user
//user specifies their desired conditions
//make call to api for local weather conditions
//if those conditions match the current weather
//alert user to go outside

//make new object to store user input
const ourData = {};

document.getElementById('myForm').addEventListener('submit', () => {
  event.preventDefault(); // Prevent the default form submission

  //create a FormData object to iterate across
  let input = document.querySelector('#myForm');
  const formData = new FormData(input);

  //iterate across FormData object and store user input in standard object
  for (const pair of formData.entries()) {
    ourData[pair[0]] = pair[1];
  }

  //make call to api with user's zipcode
  apiCall(ourData.zipcode);
  setInterval(apiCall, 900000, ourData.zipcode);
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
      //localRain = data.rain;
      // localGust = data.wind.gust;
      //check to see if temp is within desired range from user //min-temp //max-temp
      if (
        localTemp >= ourData['min-temp'] &&
        localTemp <= ourData['max-temp']
      ) {
        alert('Go Outside!');
      }
    })
    .catch((error) => {
      alert(error);
    });
}
