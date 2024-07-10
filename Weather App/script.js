document.getElementById('getWeatherBtn').addEventListener('click', function() {
    const city = document.getElementById('cityInput').value.trim();
    console.log('City entered:', city);  
    if (city) {
        getWeatherData(city);
    } else {
        alert('Please enter a city name.');
    }
});

function getWeatherData(city) {
    const apiKey = '83c7d32a5013f8d2a87eae234dbf2333'; 
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    console.log('API URL:', apiUrl);  
    
    fetch(apiUrl)
        .then(response => {
            console.log('API response status:', response.status);  
            if (!response.ok) {
                throw new Error('City not found or an error occurred while fetching the weather data.');
            }
            return response.json();
        })
        .then(data => {
            console.log('API response data:', data);  
            displayWeatherData(data);
        })
        .catch(error => {
            console.error('Error fetching the weather data:', error);
            displayError(error.message);
        });
}

function displayWeatherData(data) {
    document.getElementById('cityName').innerText = data.name;
    document.getElementById('weatherIcon').src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    document.getElementById('weatherDescription').innerText = data.weather[0].description;
    document.getElementById('temperature').innerText = `Temperature: ${data.main.temp}°C`;
    document.getElementById('weatherData').classList.remove('hidden');
    document.getElementById('error').classList.add('hidden');
}

function displayError(message) {
    document.getElementById('errorMessage').innerText = message;
    document.getElementById('error').classList.remove('hidden');
    document.getElementById('weatherData').classList.add('hidden');
}

