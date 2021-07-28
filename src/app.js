function formatDate(timestamp) {
  let daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Sarturday",
  ];
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let day = daysOfWeek[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}

function formatDayForecast(timestampForecast) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let dateForecast = new Date(timestampForecast * 1000);
  let day = days[dateForecast.getDay()];

  return day;
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `  
            <div class="col-2">
              <div class="weather-forecast-date">${formatDayForecast(
                forecastDay.dt
              )}</div>
              <img
                src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"
                alt=""
                width="42"
              />
              <div class="weather-forecast-dates">
                <span class="weather-forecast-max">${Math.round(
                  forecastDay.temp.max
                )}&deg </span
                ><span class="weather-forecast-min">${Math.round(
                  forecastDay.temp.min
                )}&deg</span>
              </div>
            </div>
          `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates.lon);
  let apiKey = "5d28e41830862bc850144acfa82e7516";

  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  console.log(response.data);
  document.querySelector(
    "#city"
  ).innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  document.querySelector("#innerTemp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#desc").innerHTML =
    response.data.weather[0].description;
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector("#windSpeed").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )}Km/h`;

  document.querySelector("#date").innerHTML = formatDate(
    response.data.dt * 1000
  );
  let iconApi = response.data.weather[0].icon;
  document
    .querySelector("#icon")
    .setAttribute("src", `http://openweathermap.org/img/wn/${iconApi}@2x.png`);
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.weather[0].description);

  celciusTemperature = response.data.main.temp;

  getForecast(response.data.coord);
}
function search(city) {
  let apiKey = "5d28e41830862bc850144acfa82e7516";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}
function handleCity(event) {
  event.preventDefault();
  let searchELement = document.querySelector("#searchInput");
  search(searchELement.value);
}
function showFahrenheitTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#innerTemp");
  //remove the active class from the celcius link
  celcius.classList.remove("active");
  fahrenheit.classList.add("active");
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(fahrenheitTemperature);
}
function showCelciusTemp(event) {
  event.preventDefault();
  celcius.classList.add("active");
  fahrenheit.classList.remove("active");
  let tempElement = document.querySelector("#innerTemp");
  tempElement.innerHTML = Math.round(celciusTemperature);
}
let celciusTemperature = null;

document.querySelector("#formInput").addEventListener("submit", handleCity);

let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", showFahrenheitTemp);

let celcius = document.querySelector("#celcius-link");
celcius.addEventListener("click", showCelciusTemp);

search("Ilesa");
