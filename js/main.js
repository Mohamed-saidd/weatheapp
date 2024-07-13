// "http://api.weatherapi.com/v1/search.json?key=f8f8e704a9994a93a0201012240807&q=lond"

let date = new Date();

let todayName = document.getElementById("today-data-day");
let todayNumber = document.getElementById("today-data-num");
let todayMuonth = document.getElementById("today-data-mounth");
let todayLocation = document.getElementById("today-location");
let todayTemp = document.getElementById("today_temp");
let todayimg = document.getElementById("today_condation_img");
let todayCondation = document.getElementById("today-condation");
let todayHumidity = document.getElementById("humidity");

// next Days

let nextNumber = document.getElementById("tomoro-data-num");
let nextMuonth = document.getElementById("tomoro-data-mounth");
let nextTempMax = document.getElementById("tomoro_temp_max");
let nextTempmin = document.getElementById("tomoro_temp_min");
let nextCondation = document.getElementById("tomoro-condation");
let nextcondationimg = document.getElementById("tomoro_condation_img");
//aftar next Days

let afternextNumber = document.getElementById("after-tomoro-data-num");
let afternextMuonth = document.getElementById("after-tomoro-data-mounth");
let afternextTempMax = document.getElementById("after-tomoro_temp_max");
let afternextTempmin = document.getElementById("after-tomoro_temp_min");
let afternextCondation = document.getElementById("after-tomoro-condation");
let afternextcondationimg = document.getElementById(
  "after_tomoro_condation_img"
);

// Search input

let searchInput = document.getElementById("search");
let btn = document.getElementById("btn");

// Get Data Function
async function getWeatherData(cityName) {
  let weatherReq = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=f8f8e704a9994a93a0201012240807&q=${cityName}&days=3`
  );
  let weatherData = await weatherReq.json();

  return weatherData;
}

// Show Today data
function showTodayData(data) {
  todayName.innerHTML = date.toLocaleDateString("en-US", { weekday: "long" });
  todayNumber.innerHTML = date.getDate();
  todayName.innerHTML = date.toLocaleDateString("en-US", { month: "long" });
  todayLocation.innerHTML = data.location.name;
  todayTemp.innerHTML = data.current.temp_c;
  todayimg.setAttribute("src", data.current.condition.icon);
  todayCondation.innerHTML = data.current.condition.text;
  todayHumidity.innerHTML = data.current.humidity;
}

// Show next day data
function showNextDayData(data) {
  let nextDayDate = new Date(data.forecast.forecastday[1].date);
  nextNumber.innerHTML = nextDayDate.getDate();
  nextMuonth.innerHTML = nextDayDate.toLocaleDateString("en-US", {
    month: "long",
  });
  nextTempMax.innerHTML = data.forecast.forecastday[1].day.maxtemp_c;
  nextTempmin.innerHTML = data.forecast.forecastday[1].day.mintemp_c;
  nextCondation.innerHTML = data.forecast.forecastday[1].day.condition.text;
  nextcondationimg.setAttribute(
    "src",
    data.forecast.forecastday[1].day.condition.icon
  );
}
// after next day function
function showAfterNextDayData(data) {
  let nextDayDate = new Date(data.forecast.forecastday[2].date);
  afternextNumber.innerHTML = nextDayDate.getDate();
  afternextMuonth.innerHTML = nextDayDate.toLocaleDateString("en-US", {
    month: "long",
  });
  afternextTempMax.innerHTML = data.forecast.forecastday[2].day.maxtemp_c;
  afternextTempmin.innerHTML = data.forecast.forecastday[2].day.mintemp_c;
  afternextCondation.innerHTML =
    data.forecast.forecastday[2].day.condition.text;
  afternextcondationimg.setAttribute(
    "src",
    data.forecast.forecastday[2].day.condition.icon
  );
}

// Start App
async function startApp(city = "cairo") {
  if (city == "") {
    city = "cairo";
  }
  let weatherData = await getWeatherData(city);
  if (!weatherData.error) {
    showTodayData(weatherData);
    showNextDayData(weatherData);
    showAfterNextDayData(weatherData);
  }
}
startApp();

searchInput.addEventListener("input", function () {
  startApp(searchInput.value);
});
