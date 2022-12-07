const apiKey = "c7f07b12bt140d804747bo132a12beeb";
const city = "tehran";
const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

function formatDate(timestamp) {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();
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
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);

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

axios.get(apiUrl).then(displayTemperature);
