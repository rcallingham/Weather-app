let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thusday",
  "Friday",
  "Saturday",
];
let weekDay = days[now.getDay()];
let hours = now.getHours();
let minute = now.getMinutes();

let today = document.querySelector("#date");
today.innerHTML = `${weekDay} ${hours}:${minute}`;

function cityName(event) {
  event.preventDefault();
  let cityInput = document.querySelector(".changecity");
  let city = cityInput.value;
  let apiKey = "e99f59e58dee72fd528847d5d83a9671";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(retrieveWeather);
}

function retrieveWeather(response) {
  let h2 = document.querySelector("h2");
  let degrees = Math.round(response.data.main.temp);
  h2.innerHTML = `${degrees}°C`;
  let h1 = document.querySelector("#displayCity");
  h1.innerHTML = response.data.name;
  let h3 = document.querySelector("h3");
  h3.innerHTML = response.data.weather[0].main;
}

let form = document.querySelector("form");
form.addEventListener("submit", cityName);
