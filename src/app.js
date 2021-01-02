function formatDate(timestamp) {
    let date = new Date(timestamp);
    
    let days = ["Sunday", "Mondays", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];
    return `${day} ${formatHours(timestamp)}`;
}

function formatHours(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
     if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    return `${hours}:${minutes}`;
}

function displayCurrentWeather(response) {
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = response.data.name;
    let descriptionElement = document.querySelector("#description");
    descriptionElement.innerHTML = response.data.weather[0].description;
    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = response.data.main.humidity;
    let windSpeed = document.querySelector("#wind");
    windSpeed.innerHTML = Math.round(response.data.wind.speed);
    let dateElement = document.querySelector("#date");
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);
}

function displayForecast(response) {
    
    let forecastElement = document.querySelector("#forecast");
    let forecast = null;
    forecastElement.innerHTML = null;
    
    for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += ` 
    <div class="col-2">
     <h3>
         ${formatHours(forecast.dt * 1000)}
     </h3>
     <img 
     src="http://openweathermap.org/img/wn/${
         forecast.weather[0].icon
        }@2x.png" 
     alt=""
     class="weather-forecast-img"
     />
     <div class="weather-forecast-temperature">
         <strong>
         ${Math.round(forecast.main.temp_max)}°
         </strong> 
         ${Math.round(forecast.main.temp_min)}°
     </div>
  </div>
  `;
 }
}

function search(city) {
let apiKey = "d2991882ca3e5ee6762070360098f550";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayCurrentWeather);

apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayForecast);
}
function handleSubmit(event) {
   event.preventDefault();
   let cityInputElement = document.querySelector("#city-input");
   search(cityInputElement.value);
}
search("New York");

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);