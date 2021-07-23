function displayTemperature(response) {
  console.log(response.data.main.temp);
  console.log(response.data.name);
  console.log(response.data.weather[0].description);
  console.log(response.data.main.humidity);
  console.log(response.data.wind.speed);

  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#innerTemp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#desc").innerHTML =
    response.data.weather[0].description;
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector(
    "#windSpeed"
  ).innerHTML = `Wind: ${response.data.wind.speed}Km/h`;
}
let apiKey = "5d28e41830862bc850144acfa82e7516";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric`;
console.log(apiUrl);

axios.get(apiUrl).then(displayTemperature);
