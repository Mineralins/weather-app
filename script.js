const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const weatherResult = document.getElementById('weather-result');

async function getWeather(cityName) {
   const response = await fetch(`${WEATHER_CONFIG.API_URL}?key=${WEATHER_CONFIG.API_KEY}&q=${cityName}`);

    if (!response.ok) {
        weatherResult.innerHTML = `<p>Город не найден. Попробуйте еще раз.</p>`;
        return;
    }
    const data = await response.json();
    console.log(data);
    displayWeather(data);
}

function displayWeather(weatherData) {
    const city = weatherData.location.name;
    const country = weatherData.location.country;
    const temp = weatherData.current.temp_c; 
    const condition = weatherData.current.condition.text;
    const iconUrl = weatherData.current.condition.icon;

    weatherResult.innerHTML = `
        <h2 class="city-name">${city}, ${country}</h2>
        <div class="temperature">${temp}°C</div>
        <img src="https:${iconUrl}" alt="${condition}" class="weather-icon">
        <div class="weather-condition">${condition}</div>
    `;
}
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    } else {
        weatherResult.innerHTML = `<p>Пожалуйста, введите название города.</p>`;
    }
});