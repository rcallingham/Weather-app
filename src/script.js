let now = new Date();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let weekDay = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let date = now.getDate();
if (date < 2) {
  date = `${date}st`;
}
if (date === 2) {
  date = `${date}nd`;
}
if (date === 3) {
  date = `${date}rd`;
} else {
  date = `${date}th`;
}
let monthName = [
  "January",
  "Febuary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let month = monthName[now.getMonth()];

let todayDate = document.querySelector("#date");
todayDate.innerHTML = `${weekDay} ${date} ${month}`;
let lastUpdated = document.querySelector("#time");
lastUpdated.innerHTML = `${hours}:${minutes}`;

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weekly-forecast");
  let forecastHTML = `<div class="row bottom">`;

  forecast.forEach(function (forecastDay, index) {
    if ((index < 7) & (index > 0)) {
      forecastHTML =
        forecastHTML +
        `
          <div class="col-2">
            <img
              src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }.png
          "
              alt="weather description"
              class="emoji"
            />
    
            <div class="degreeCol1">${Math.round(forecastDay.temp.day)}°C</div>
            <div class="day">${formatForecastDay(forecastDay.dt)}</div>
            16th
          </div> `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "e99f59e58dee72fd528847d5d83a9671";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function cityName(event) {
  event.preventDefault();
  let cityInput = document.querySelector(".changecity");
  let city = cityInput.value;
  let apiKey = "e99f59e58dee72fd528847d5d83a9671";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(retrieveWeather);
}

function retrieveWeather(response) {
  let currentTemp = document.querySelector("#temp");
  let degrees = Math.round(response.data.main.temp);
  currentTemp.innerHTML = `${degrees}`;
  let h1 = document.querySelector("#displayCity");
  h1.innerHTML = response.data.name;
  let h3 = document.querySelector("h3");
  h3.innerHTML = response.data.weather[0].main;
  let currentIcon = document.querySelector("#main-image");
  currentIcon.setAttribute(
    "src",
    ` http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  tempCelcius = response.data.main.temp;

  getForecast(response.data.coord);
}

function degreesFar(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp");
  tempCel.classList.remove("active");
  tempFar.classList.add("active");
  let tempFarenheit = (tempCelcius * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(tempFarenheit);
}

function degreesCel(event) {
  event.preventDefault();
  tempCel.classList.add("active");
  tempFar.classList.remove("active");
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = Math.round(tempCelcius);
}

let form = document.querySelector("form");
form.addEventListener("submit", cityName);

let tempCelcius = null;

let tempFar = document.querySelector("#farenheit");
tempFar.addEventListener("click", degreesFar);
let tempCel = document.querySelector("#celcius");
tempCel.addEventListener("click", degreesCel);

getForecast(London);
