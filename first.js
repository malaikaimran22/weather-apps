// Define the API key and default city
let Apikey = "66546a4a6beeeda263b89e7dd651ad95";
let defaultCity = "Multan";

// Event listener for the search button
document.getElementById("searchbtn").addEventListener("click", function () {
    const city = document.getElementById("inputsearch").value;

    if (city === "") {
        alert("Please enter a city name");
        return;
    }

    updateWeather(city);
});

// Automatically update weather data for the default city on page load
window.addEventListener("load", function () {
    updateWeather(defaultCity);
});

// Function to fetch and update weather data
function updateWeather(city) {
    const currentURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${Apikey}&units=metric`;
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${Apikey}&units=metric`;

    // Fetch current weather data
    fetch(currentURL)
        .then((response) => response.json())
        .then((data) => {
            document.getElementById("city").textContent = data.name;
            document.getElementById("temp").textContent = `${Math.round(data.main.temp)}°`;
            document.getElementById("wind").textContent = `${data.wind.speed} mph`;
            document.getElementById("humidity").textContent = `${data.main.humidity}%`;
            document.getElementById("condition").textContent = data.weather[0].description;
            document.getElementById('current-temp').textContent = `${data.main.temp}°C`;
            document.getElementById("wind2").textContent = `${data.wind.speed} mph`;
            document.getElementById("humidity2").textContent = `${data.main.humidity}%`;
            document.getElementById('hourly-condition').textContent = data.weather[0].description;
            document.getElementById('feels-like').textContent = `feels like ${data.main.feels_like}°C`;

            let sunset = new Date(data.sys.sunset * 1000);
            let sunrise = new Date(data.sys.sunrise * 1000);
            document.getElementById("sunrise").textContent = sunrise.toLocaleTimeString();
            document.getElementById("sunset").textContent = sunset.toLocaleTimeString();

            let hours = new Date().getHours();
            let greeting;

            if (hours < 12) {
                greeting = "Good Morning";
            } else if (hours < 18) {
                greeting = "Good Afternoon";
            } else {
                greeting = "Good Evening";
            }

            document.getElementById("greetmrng").textContent = greeting;
         })
        .catch((error) => {
            console.error("Error fetching the current weather data:", error);
            alert('Failed to retrieve data. Please try again.');
        });

    // Fetch 5-day forecast data
    fetch(forecastURL)
        .then((response) => response.json())
        .then((data) => {
            const daysMap = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            data.list.forEach((item, index) => {
                if (index % 8 === 0 && index < 40) {
                    const date = new Date(item.dt * 1000);
                    const day = daysMap[date.getDay()];
                    document.querySelector(`#day${index / 8 + 1} p:nth-child(1)`).textContent = day;
                    document.querySelector(`#day${index / 8 + 1} p:nth-child(2)`).textContent = `${Math.round(item.main.temp)}°`;
                    document.querySelector(`#day${index / 8 + 1} p:nth-child(3)`).textContent = item.weather[0].main;
                }
            });
        })
        .catch((error) => {
            console.error("Error fetching the 5-day forecast data:", error);
        });

    // Update the current time every second
    setInterval(function () {
        const date = new Date();
        document.getElementById("time").innerHTML = date.toLocaleTimeString();
    }, 1000);
}
