const cityName =document.querySelector(".cityName");
const searchButton = document.querySelector("#searchBtn");
const locationButton = document.querySelector("#locationBtn");

searchButton.addEventListener("click",searchData());
function searchData() {
    const apiKey = "e9416796f09cfcf352510bfc92e111d8";
    const city = cityName.value;
    if(!city){
        alert("Please enter a Valid Cityname");
        return;
    }
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
    const forecastUrl =`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

    fetch(weatherUrl)
    .then(response => response.json())
    .then(result => displayWeather(result))
    .catch(error=>console.error("Error fetching the data",error));

    fetch(forecastUrl)
    .then(response => response.json())
    .then(result => displayDaysForecast(result.list))
    .catch(error=>console.error("Error fetching the forecast data",error));
}
function displayWeather(data) {
    const weatherImage =document.getElementsByClassName("weather-img");
    const locationDate =document.getElementsByClassName("locationDate");
    const tempData = document.getElementsByClassName("temp");
    const windSpeed =document.getElementsByClassName("wind");
    const humidityData =document.getElementsByClassName("humidity");

    tempData.innerHTML='';
    locationDate.innerHTML ='';
    windSpeed.innerHTML='';
    humidityData.innerHTML='';

    cityName=result.name;
    const temparature = Math.data.main.temp - 273.15;
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`;

    const temparatureHtml = `<p>${temparature}</p>`;

    const weatherHtml = `<p>${cityName}</p>
                        <p>${description}</p>`;

    locationDate.innerHTML=weatherHtml;
    tempData.innerHTML=temparatureHtml;
    weatherImage.src = iconUrl;
    weatherImage.alt = description;

    showImage();
}
function showImage() {
    const weatherIcon =document.getElementsByClassName("weather-img");
    weatherIcon.style.display ='block';
}
// e9416796f09cfcf352510bfc92e111d8
