const api = {
  key: "cfca3d4f40f4af16b18eb6a8b4379e3f",
  base: "https://api.openweathermap.org/data/2.5/"
};

var tempUnit = '°c';
var tempSystem = 'metric';

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
	getTempSelect();
	console.log(tempSystem);
    getResults(searchbox.value);
  }
}

function getResults (query) {
  fetch(`${api.base}weather?q=${query}&units=${tempSystem}&APPID=${api.key}`)
    .then(weather => {
      return weather.json();
    }).then(displayResults);
}

function displayResults (weather) {
  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;
  
  let coord = document.querySelector('.location .coord');
  var longLetter = weather.coord.lon < 0 ? 'W' : 'E';
  var latLetter = weather.coord.lat < 0 ? 'S' : 'E';
  coord.innerText = `${Math.abs(weather.coord.lon)} ${longLetter}, ${Math.abs(weather.coord.lat)} ${latLetter}`;

  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span> ${tempUnit}</span>`;
  
  let feelslike = document.querySelector('.current .feelslike');
  feelslike.innerHTML = `Feels like: ${Math.round(weather.main.feels_like)}<span> ${tempUnit}</span>`;

  let weather_cond = document.querySelector('.current .weather');
  weather_cond.innerText = weather.weather[0].main;
  
  let weather_cond_desc = document.querySelector('.current .weatherdesc');
  weather_cond_desc.innerText = weather.weather[0].description;
  
  var icon = document.getElementById('icon');
	icon.src = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

  let hilow = document.querySelector('.hi-low');
  hilow.innerHTML = `${Math.round(weather.main.temp_min)} ${tempUnit} / 
	${Math.round(weather.main.temp_max)} ${tempUnit}`;

  let humid = document.querySelector('.humidity');
  humid.innerText = `Humidity: ${weather.main.humidity} %`;
}

function kelvinToCelsius(t) {
	return (t - 273.15);
}

function kelvinToFahrenheit(t) {
	let temp = kelvinToCelsius(t);
	return (temp * 9/5 + 32);
}

function dateBuilder (d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} - ${month}, ${date} ${year}`;
}

function getTempSelect()
{
	var selectValue = document.getElementById("temp-select").value;
	//console.log(selectValue);
	if (selectValue == "c")
	{
		tempUnit = '°c';
		tempSystem = 'metric';
	}
	else if (selectValue == "f")
	{
		tempUnit = '°f';
		tempSystem = 'imperial';
	}
	else
	{
		tempUnit = 'K';
		tempSystem = 'standard';
	}
}
