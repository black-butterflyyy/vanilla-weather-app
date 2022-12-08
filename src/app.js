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

function formatDay(timestamp) {
  const date = new Date(timestamp * 1000);
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return daysOfWeek[date.getDay()];
}

function displayForecast(response) {
  //only for the next 5 days
  const dailyForecast = response.data.daily.slice(1, 6);
  let forecastHtml = "";

  dailyForecast.forEach(function (forecastDay, index) {
    forecastHtml += `  <div class="col">
          <div class="weather-forecast-preview">
            <div class="forecast-time">${formatDay(forecastDay.time)}</div>
            <img class="forecast-icon" src="${
              forecastDay.condition.icon_url
            }" alt="${forecastDay.condition.description}" />
            <div class="forecast-temperature">
              <span class="forecast-temperature-max">${Math.round(
                forecastDay.temperature.maximum
              )}°</span
              ><span class="forecast-temperature-min">${Math.round(
                forecastDay.temperature.minimum
              )}°</span>
            </div>
          </div>
        </div>`;
  });

  const forecastContainer = document.getElementById("forecast");
  forecastContainer.innerHTML = forecastHtml;
}

function receiveForecast(coordinates) {
  const lat = coordinates.latitude;
  const lon = coordinates.longitude;
  const apiKey = "c7f07b12bt140d804747bo132a12beeb";
  const apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${lon}&lat=${lat}&units=metric&key=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
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

  receiveForecast(response.data.coordinates);
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

const searchFormElement = document.getElementById("search-form");
searchFormElement.addEventListener("submit", handleForm);

search("Paris");
