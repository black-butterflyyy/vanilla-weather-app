const apiKey = "c7f07b12bt140d804747bo132a12beeb";
const city = "tehran";
const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

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
}

axios.get(apiUrl).then(displayTemperature);
