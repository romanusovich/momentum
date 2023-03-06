import { locales } from "./locales";

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const cityInput = document.querySelector('.city');

export async function getWeather() {
    const city = cityInput.value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${document.documentElement.lang}&appid=830b7033b76fa1651320650123098997&units=metric`;
    const res = await fetch(url);
    const data = await res.json();

    weatherIcon.className = 'weather-icon owf';
    temperature.textContent = ``;
    weatherDescription.textContent = ``;
    wind.textContent = ``;
    humidity.textContent = ``;

    if (data.cod !== 200) {
        temperature.textContent = `${data.message.toUpperCase()}`;
    } else {
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${Math.round(data.main.temp)}°C`;
        weatherDescription.textContent = data.weather[0].description;
        wind.textContent = `${locales[document.documentElement.lang].weather.wind}: ${Math.round(data.wind.speed)} ${locales[document.documentElement.lang].weather.speed}`;
        humidity.textContent = `${locales[document.documentElement.lang].weather.humidity}: ${data.main.humidity}%`;
    }    
} 