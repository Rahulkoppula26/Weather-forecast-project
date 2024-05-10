const cityName =document.getElementById("cityname");
const searchButton = document.getElementById("searchBtn");
const locationButton = document.getElementById("locationBtn");

searchButton.addEventListener("click",searchData);
function searchData() {
    console.log("button clickes");
    const city = cityName.value;
    const API_KEY = `e9416796f09cfcf352510bfc92e111d8`;
    if(city == '') return;
    // const forecastUrl =`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
    const url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
    fetch(url)
    .then(response => response.json())
    .then(result => {

        
        const weatherImage =document.getElementsByClassName("weather-img")[0];
        const locationDate =document.getElementsByClassName("locationDate");
        const tempData = document.getElementsByClassName("temp");
        const windSpeed =document.getElementsByClassName("wind");
        const humidityData =document.getElementsByClassName("humidity");

        if (result.cod == '404' && city!==url) {
            const notFound = document.getElementsByClassName("not-found")[0];
            notFound.src ='images/404.png';
            notFound.style.display="block";
            weatherImage.style.display="none";
            showError('City not found!');
            return;
        }
        for (let i = 0; i < weatherImage.length; i++) {
            switch(result.weather[0].main) {
                case 'Clear':
                    weatherImage[i].src='images/clear.png';
                    break;
    
                case 'Rain':
                    weatherImage[i].src='images/rain.png';
                    break;
    
                case 'Snow':
                    weatherImage[i].src='images/snow.png';
                    break;
    
                case 'Clouds':
                    weatherImage[i].src='images/cloud.png';
                    break;
    
                case 'Mist':
                    weatherImage[i].src='images/mist.png';
                    break;
    
                case 'Haze':
                    weatherImage[i].src='images/haze.png';
                    break;
            
                default:
                    weatherImage[i].src='images/default-1.png';
                    break;
            }
        }
        



    })
    // .catch(error=>console.error("Error fetching the data",error));
}