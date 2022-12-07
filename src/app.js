function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) minutes = `0${minutes}`;
  if (hours < 10) hours = `0${hours}`;
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const day = daysOfWeek[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function displayTemperature(response) {
  const temperatureElement = document.getElementById("weather-temperature");
  celsiusTemperature = response.data.temperature.current;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);

  const cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;

  const weatherConditionElement = document.getElementById("weather-condition");
  weatherConditionElement.innerHTML = response.data.condition.description;

  const humidityElement = document.getElementById("humidity");
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;

  const windElement = document.getElementById("wind");
  windElement.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;

  const dateElement = document.querySelector("#date-time");
  dateElement.innerHTML = formatDate(response.data.time * 1000);

  const weatherIcon = document.getElementById("weather-icon");
  weatherIcon.src = response.data.condition.icon_url;
  weatherIcon.alt = response.data.condition.icon;
}

function search(city) {
  const apiKey = "c7f07b12bt140d804747bo132a12beeb";
  const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleForm(event) {
  event.preventDefault();
  const cityInputElement = document.getElementById("city-input");
  if (!cityInputElement.value) return;
  search(cityInputElement.value);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  const temperatureElement = document.getElementById("weather-temperature");
  temperatureElement.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);
  celsiusElement.classList.remove("active");
  fahrenheitElement.classList.add("active");
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  const temperatureElement = document.getElementById("weather-temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  celsiusElement.classList.add("active");
  fahrenheitElement.classList.remove("active");
}

let celsiusTemperature = null;

const searchFormElement = document.getElementById("search-form");
searchFormElement.addEventListener("submit", handleForm);

const fahrenheitElement = document.getElementById("fahrenheit-link");
fahrenheitElement.addEventListener("click", displayFahrenheitTemperature);

const celsiusElement = document.getElementById("celsius-link");
celsiusElement.addEventListener("click", displayCelsiusTemperature);

search("Paris");
