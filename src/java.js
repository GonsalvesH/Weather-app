// formatting the date & time
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
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "5a47f48f2314b1a01e3b9a0e67d393eb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}
function displayWeather(response) {
  let temperatureElement = document.querySelector("#current-temp");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");

  celsiusTemperature = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let icon = response.data.weather[0].icon;
  todaysIcon(icon);

  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "5a47f48f2314b1a01e3b9a0e67d393eb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function handlesubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#search-city");
  searchCity(cityInputElement.value);
}

let searchEngine = document.querySelector("#search-engine");
searchEngine.addEventListener("submit", handlesubmit);
searchCity("New York");

// current location button
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

//changing daily weather icon
let icons = {
  "01d": "fas fa-sun",
  "01n": "fas fa-moon",
  "02d": "fas fa-cloud-sun",
  "02n": "fas fa-cloud-moon",
  "03d": "fas fa-cloud",
  "03n": "fas fa-cloud",
  "04d": "fas fa-cloud",
  "04n": "fas fa-cloud",
  "09d": "fas fa-cloud-showers-heavy",
  "09n": "fas fa-cloud-showers-heavy",
  "10d": "fas fa-cloud-sun-rain",
  "10n": "fas fa-cloud-moon-rain",
  "11d": "fas fa-bolt",
  "11n": "fas fa-bolt",
  "13d": "far fa-snowflake",
  "13n": "far fa-snowflake",
  "50d": "fas fa-smog",
  "50n": "fas fa-smog",
};

function todaysIcon(icon) {
  if (icons[icon] !== undefined) {
    let iconElement = icons[icon];
    let todaysIcon = document.querySelector("#todays-icon");
    todaysIcon.setAttribute("class", iconElement);
  }
}
//displaying forecast
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  return days[day];
}
function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecast = response.data.daily;
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 4) {
      forecastHTML =
        forecastHTML +
        `<div class="col-3">
              <span class="weekdays">${formatDay(forecastDay.dt)}</span>
              <br />
              <div class="prediction">
                <span class="temperature">${Math.round(
                  forecastDay.temp.max
                )}°</span>/ <span class="min-temperature">${Math.round(
          forecastDay.temp.min
        )}°</span>
                <br />
                <i class="${forecastIcon(forecastDay.weather[0].icon)}"></i>
              </div>
            </div>
          `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}
displayForecast();
function forecastIcon(icon) {
  if (icons[icon] !== undefined) {
    return icons[icon];
  }
}
