const searchButton = document.getElementById("searchBtn");
const locationButton = document.getElementById("locationBtn");
const cityName =document.getElementById("cityname");
const weatherSection =document.querySelector(".allarticles");
const currentWeather =document.querySelector(".locationDetails");

const API_KEY = "be4beef315a177569ce308eb558062a9";


searchButton.addEventListener("click",function () {
    const mainCard = document.querySelector(".main-card");
    mainCard.style.display="none";
})
searchButton.addEventListener("click",fetchingImage);
function fetchingImage() {
    const city = cityName.value;
    if(city == '') return;
    const url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
    fetch(url)
    .then(response => response.json())
    .then(result => {
        const notFound = document.getElementsByClassName("not-found")[0];
        const weatherImage =document.getElementsByClassName("weather-img")[0];
        if (result.cod == '404') {
            notFound.style.display="block";
            weatherImage.style.display="none";
            return;
        }else {
            weatherImage.style.display='block';
            switch(result.weather[0].main) {
                case 'Clear':
                    weatherImage.src='images/clear.png';
                    break;
    
                case 'Rain':
                    weatherImage.src='images/rain.png';
                    break;
    
                case 'Snow':
                    weatherImage.src='images/snow.png';
                    break;
    
                case 'Clouds':
                    weatherImage.src='images/cloud.png';
                    break;
    
                case 'Mist':
                    weatherImage.src='images/mist.png';
                    break;
    
                case 'Haze':
                    weatherImage.src='images/haze.png';
                    break;
            
                default:
                    weatherImage.src='images/default-1.png';
                    break;
            }
        }
    
        
    })
    .catch(error=>console.error("Error fetching the data",error));
};





function createWeatherDetails(city,weatherElement,index) {
    if (index === 0) {
        return `<article class="locationDetails">
                    <div class="font-bold text-xl" >${city} (<span class="date">${weatherElement.dt_txt.split(" ")[0]}</span>)</div>
                    <div>Temprature : ${(weatherElement.main.temp - 273.15).toFixed(1)}°C</div>
                    <div>Wind : ${weatherElement.wind.speed}M/S</div>
                    <div>Humidity : ${weatherElement.main.humidity}</div>
                    <div>${weatherElement.weather[0].description} </div>
                </article>`;
    } else {
        return `<article class="article">
                  <h3 class="font-bold text-xl">(${weatherElement.dt_txt.split(" ")[0]})</h3>
                  <img class="fivedayimg" src="https://openweathermap.org/img/wn/${weatherElement.weather[0].icon}@2x.png" alt="Image"/>
                  <div>Temp :${(weatherElement.main.temp - 273.15).toFixed(1)}°C</div>
                  <div>Wind : ${weatherElement.wind.speed}M/S</div>
                  <div>Humidity : ${weatherElement.main.humidity} %</div>
                </article>`;
    }
}
function receivedData(city,lat,lon){
    const url =`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    fetch(url).then(response => response.json()).then(result =>{
        
        const uniqueDays =[];
        const allDaysForecast = result.list.filter(forecast => {
            const forecastDate = new Date(forecast.dt_txt).getDate();
            if (!uniqueDays.includes(forecastDate)) {
                return uniqueDays.push(forecastDate);
            }
        });
        cityName.innerHTML='';
        weatherSection.innerHTML='';
        currentWeather.innerHTML='';
        allDaysForecast.forEach((weatherElement,index) => {
            if (index === 0) {
                currentWeather.insertAdjacentHTML("beforeend",createWeatherDetails(city,weatherElement,index));
            } else {
                weatherSection.insertAdjacentHTML("beforeend",createWeatherDetails(city,weatherElement,index));
            }
        });
    }).catch(() => alert("Error fetching"))
}


searchButton.addEventListener("click",searchData);

function searchData() {
    const city = cityName.value.trim();
    if (!city) return;
    const geoUrl =`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`; 
    fetch(geoUrl).then(response => response.json()).then(result => {
        if (!result.length)return alert(`No data found  ${city}`);
        const { name , lat , lon } = result[0];
        receivedData(name , lat , lon);
    }).catch(() => {
        alert("Error fetching");
    });
}
locationButton.addEventListener("click",function () {
    navigator.geolocation.getCurrentPosition(
        position => {
            const {lat , lon} = position.coords;
            fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`)
            .then(response => response.json())
            .then(result => {
                const name = result[0];
                receivedData(name,lat,lon);
            })

        },
        error =>{
            if (error.code ==error.PERMISSION_DENIED) {
                alert("Location Permission Denied");
            };
        }
    );
    
});