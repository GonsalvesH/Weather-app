function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  let currentDay = days[now.getDay()];
  let currentYear = now.getFullYear();
  let currentMonth = months[now.getMonth()];
  let currentMonthDay = now.getDate();
  let currentHour = now.getHours();
  let currentMinute = ("0" + now.getMinutes()).slice(-2);
  return `${currentDay} <br/> ${currentMonthDay}/${currentMonth}/${currentYear} <br/> ${currentHour}:${currentMinute} `;
}

let now = new Date();
let todaysdate = document.querySelector("#date");
todaysdate.innerHTML = formatDate();

//search engine
function displayWeather(response) {
  console.log(response.data);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
}

function searchCity(event) {
  event.preventDefault();
  let apiKey = "5a47f48f2314b1a01e3b9a0e67d393eb";
  let city = document.querySelector("#search-city").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}
let searchEngine = document.querySelector("#search-engine");
searchEngine.addEventListener("submit", searchCity);

// celsius/fahrenheit conversion
function convertToFahrenheit(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#current-temp");
  let temperature = currentTemp.innerHTML;
  currentTemp.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

function convertToCelsius(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#current-temp");
  let temperature = currentTemp.innerHTML;
  currentTemp.innerHTML = Math.round((temperature - 32) / 1.8);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

// current location button
// select button with doc.query selector,
//add event listener call function
function searchLocation(position) {
  let apiKey = "5a47f48f2314b1a01e3b9a0e67d393eb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}
function showCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", showCurrentLocation);
