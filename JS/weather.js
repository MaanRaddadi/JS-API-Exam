let endPoint =
  "https://api.openweathermap.org/data/2.5/weather?q=Riyadh&units=metric&appid=b083d807caa7d593171a741101d792c7";
let key = "b083d807caa7d593171a741101d792c7";
const cityName = document.getElementById("cityName");
const temp = document.getElementById("temp");
const humidity = document.getElementById("humidity");
const lat = document.getElementById("lat");
const lng = document.getElementById("lng");
const weatherBtn = document.getElementById("weatherBtn");
let cuurentUser;
if (
  localStorage.getItem("user") === undefined ||
  localStorage.getItem("user") === null
) {
  window.location.href = "signIn.html";
} else {
  const user = JSON.parse(localStorage.getItem("user"));
  document.getElementById(
    "navbarUserName"
  ).innerText = `Welcom, ${user.username}`;
}

const getWeatherData = async () => {
  try {
    const response = await fetch(`${endPoint}`);
    const data = await response.json();

    cityName.textContent = `${data.name}`;
    temp.innerHTML = `<i class="bi bi-thermometer-sun"></i> Temp: ${data.main.temp}°C`;
    humidity.innerHTML = `<i class="bi bi-moisture"></i> Humidity: ${data.main.humidity}`;
    lat.innerHTML = `<i class="bi bi-compass-fill"></i> Latitude: ${data.coord.lat}`;
    lng.innerHTML = `<i class="bi bi-compass-fill"></i> Longtitude: ${data.coord.lon}`;
  } catch (error) {
    console.log(`status ${error}`);
  }
};
getWeatherData();

weatherBtn.addEventListener("click", () => {
  document.querySelector(".headerBtn").classList.toggle("hide");
  document.querySelector(".weather-container").classList.remove("hide");
});
const backButtonWeather = document.getElementById("backButtonWeather");

backButtonWeather.addEventListener("click", () => {
  document.querySelector(".headerBtn").classList.toggle("hide");
  document.querySelector(".weather-container").classList.add("hide");
});
