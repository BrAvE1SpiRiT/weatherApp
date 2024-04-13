const apiKeyWeather = '8b106b724a27471cb6b154620240704'
const apiKeyGeolocation = '1f1b9591-3ccb-4212-a4ec-18f11d78b7af'


let body = document.querySelector('.body');
let weatherApp = document.querySelector('.weather-app');
let locationButton = document.getElementById('location-button');
let locationIcon = document.getElementById('location-icon');
let inputSity = document.getElementById('city-input');
let buttonSearchSity = document.getElementById('search-button');
let forecast = document.getElementById('forecast');
let footer = document.querySelector('.footer');

let cityName = document.getElementById('city-name');
let dateHour = document.getElementById('date-hour');
let temperature = document.getElementById('temperature');
let celsiusLink = document.getElementById('celsius-link');
let fahrenheitLink = document.getElementById('fahrenheit-link');
let weatherDescription = document.getElementById('weather-description');
let weatherIcon = document.getElementById('weather-icon');
let feelsLike = document.getElementById('feels-like');
let humidityLevel = document.getElementById('humidity-level');
let windSpeed = document.getElementById('wind-speed');
let listForecast = document.querySelector('.footer__list-forecast');


let nightModes;



function dateConvert(date) {
	const currentDate = new Date(date);
	const daysWeek = [
		'Воскресенье',
		'Понедельник',
		'Вторник',
		'Среда',
		'Четверг',
		'Пятница',
		'Суббота'
	];
	const daysMonth = [
		'Января',
		'Февраля',
		'Марта',
		'Апреля',
		'Мая',
		'Июня',
		'Июля',
		'Августа',
		'Сентября',
		'Октября',
		'Ноября',
		'Декабря'
	];
	return `${daysWeek[currentDate.getDay()]}, ${currentDate.getDate()} ${daysMonth[currentDate.getMonth()]} ${currentDate.getFullYear()} | ${currentDate.getHours().toString().length > 1 ? currentDate.getHours() : '0' + currentDate.getHours()} : ${currentDate.getMinutes().toString().length > 1 ? currentDate.getMinutes() : '0' + currentDate.getMinutes()}`;
}
function nightMode(date) {
	const currentDate = new Date(date)
	const hour = currentDate.getHours()
	if (hour >= 19 || hour < 6) {
		nightModes = true;
		body.classList.add('nightmode')
		weatherApp.classList.add('nightmode')
		locationButton.classList.add('nightmode')
		inputSity.classList.add('nightmode')
		buttonSearchSity.classList.add('nightmode')
		footer.classList.add('nightmode')
		forecast.classList.add('nightmode')
		locationIcon.setAttribute('src', './img/location-dark.svg')
		return nightModes
	} else {
		nightModes = false;
		body.classList.remove('nightmode')
		weatherApp.classList.remove('nightmode')
		locationButton.classList.remove('nightmode')
		inputSity.classList.remove('nightmode')
		buttonSearchSity.classList.remove('nightmode')
		footer.classList.remove('nightmode')
		forecast.classList.remove('nightmode')
		locationIcon.setAttribute('src', './img/location-light.svg')
		return nightModes
	}
}
function geolocation() {
	buttonSearchSity.addEventListener('click', function (e) {
		e.preventDefault();
		let sityName = inputSity.value;
		fetch(`https://catalog.api.2gis.com/3.0/items/geocode?q=${sityName}&fields=items.point&key=${apiKeyGeolocation}`)
			.then(response => response.json())
			.then(json => {
				return {
					lat: json.result.items[0].point.lat,
					lon: json.result.items[0].point.lon,
				};
			})
			.then(coords => {
				listForecast.innerHTML = '';
				displayWeather(coords.lat, coords.lon)
				today.classList.add('active')
				week.classList.remove('active')
				fourteenDays.classList.remove('active')
			});
	})
}
function mainIcon(code, iconForecast) {
	if (iconForecast) {
		if (nightModes) {
			switch (code) {
				case 1000:
					weatherIcon.setAttribute('src', './img/icons/skc_n.svg')
					iconForecast.setAttribute('src', './img/icons/skc_n.svg')
					break;
				case 1003:
					weatherIcon.setAttribute('src', './img/icons/bkn_n.svg')
					iconForecast.setAttribute('src', './img/icons/bkn_n.svg')
					break;
				case 1006:
					weatherIcon.setAttribute('src', './img/icons/ovc(1).svg')
					iconForecast.setAttribute('src', './img/icons/ovc(1).svg')
					break;
				case 1009:
					weatherIcon.setAttribute('src', './img/icons/ovc(1).svg')
					iconForecast.setAttribute('src', './img/icons/ovc(1).svg')
					break;
				case 1030:
					weatherIcon.setAttribute('src', './img/icons/fg_n.svg')
					iconForecast.setAttribute('src', './img/icons/fg_n.svg')
					break;
				case 1063:
					weatherIcon.setAttribute('src', './img/icons/bkn_-ra_n.svg')
					iconForecast.setAttribute('src', './img/icons/bkn_-ra_n.svg')
					break;
				case 1066:
					weatherIcon.setAttribute('src', './img/icons/bkn_-sn_n.svg')
					iconForecast.setAttribute('src', './img/icons/bkn_-sn_n.svg')
					break;
				case 1069:
					weatherIcon.setAttribute('src', './img/icons/bkn_-sn_n.svg')
					iconForecast.setAttribute('src', './img/icons/bkn_-sn_n.svg')
					break;
				case 1072:
					weatherIcon.setAttribute('src', './img/icons/bkn_ra_n.svg')
					iconForecast.setAttribute('src', './img/icons/bkn_ra_n.svg')
					break;
				case 1087:
					weatherIcon.setAttribute('src', './img/icons/ovc_ts(1).svg')
					iconForecast.setAttribute('src', './img/icons/ovc_ts(1).svg')
					break;
				case 1114:
					weatherIcon.setAttribute('src', './img/icons/-bl(1).svg')
					iconForecast.setAttribute('src', './img/icons/-bl(1).svg')
					break;
				case 1117:
					weatherIcon.setAttribute('src', './img/icons/bl(1).svg')
					iconForecast.setAttribute('src', './img/icons/bl(1).svg')
					break;
				case 1135:
					weatherIcon.setAttribute('src', './img/icons/fg_n.svg')
					iconForecast.setAttribute('src', './img/icons/fg_n.svg')
					break;
				case 1147:
					weatherIcon.setAttribute('src', './img/icons/fg_n.svg')
					iconForecast.setAttribute('src', './img/icons/fg_n.svg')
					break;
				case 1150:
					weatherIcon.setAttribute('src', './img/icons/bkn_-ra_n.svg')
					iconForecast.setAttribute('src', './img/icons/bkn_-ra_n.svg')
					break;
				case 1153:
					weatherIcon.setAttribute('src', './img/icons/bkn_-ra_n.svg')
					iconForecast.setAttribute('src', './img/icons/bkn_-ra_n.svg')
					break;
				case 1168:
					weatherIcon.setAttribute('src', './img/icons/bkn_ra_n.svg')
					iconForecast.setAttribute('src', './img/icons/bkn_ra_n.svg')
					break;
				case 1171:
					weatherIcon.setAttribute('src', './img/icons/bkn_+ra_n.svg')
					iconForecast.setAttribute('src', './img/icons/bkn_+ra_n.svg')
					break;
				case 1180:
					weatherIcon.setAttribute('src', './img/icons/bkn_-ra_n.svg')
					iconForecast.setAttribute('src', './img/icons/bkn_-ra_n.svg')
					break;
				case 1183:
					weatherIcon.setAttribute('src', './img/icons/bkn_-ra_n.svg')
					iconForecast.setAttribute('src', './img/icons/bkn_-ra_n.svg')
					break;
				case 1186:
					weatherIcon.setAttribute('src', './img/icons/bkn_-ra_n.svg')
					iconForecast.setAttribute('src', './img/icons/bkn_-ra_n.svg')
					break;
				case 1189:
					weatherIcon.setAttribute('src', './img/icons/bkn_ra_n.svg')
					iconForecast.setAttribute('src', './img/icons/bkn_ra_n.svg')
					break;
				case 1192:
					weatherIcon.setAttribute('src', './img/icons/bkn_+ra_n.svg')
					iconForecast.setAttribute('src', './img/icons/bkn_+ra_n.svg')
					break;
				case 1195:
					weatherIcon.setAttribute('src', './img/icons/bkn_+ra_n.svg')
					iconForecast.setAttribute('src', './img/icons/bkn_+ra_n.svg')
					break;
				case 1198:
					weatherIcon.setAttribute('src', './img/icons/bkn_-ra_n.svg')
					iconForecast.setAttribute('src', './img/icons/bkn_-ra_n.svg')
					break;
				case 1201:
					weatherIcon.setAttribute('src', './img/icons/bkn_+ra_n.svg')
					iconForecast.setAttribute('src', './img/icons/bkn_+ra_n.svg')
					break;
				case 1204:
					weatherIcon.setAttribute('src', './img/icons/bkn_-sn_n.svg')
					iconForecast.setAttribute('src', './img/icons/bkn_-sn_n.svg')
					break;
				case 1207:
					weatherIcon.setAttribute('src', './img/icons/bkn_+sn_n.svg')
					iconForecast.setAttribute('src', './img/icons/bkn_+sn_n.svg')
					break;
				case 1210:
					weatherIcon.setAttribute('src', './img/icons/ovc_-sn(1).svg')
					iconForecast.setAttribute('src', './img/icons/ovc_-sn(1).svg')
					break;
				case 1213:
					weatherIcon.setAttribute('src', './img/icons/bkn_-sn_n.svg')
					iconForecast.setAttribute('src', './img/icons/bkn_-sn_n.svg')
					break;
				case 1216:
					weatherIcon.setAttribute('src', './img/icons/ovc_sn(1).svg')
					iconForecast.setAttribute('src', './img/icons/ovc_sn(1).svg')
					break;
				case 1219:
					weatherIcon.setAttribute('src', './img/icons/bkn_sn_n.svg')
					iconForecast.setAttribute('src', './img/icons/bkn_sn_n.svg')
					break;
				case 1222:
					weatherIcon.setAttribute('src', './img/icons/ovc_+sn(1).svg')
					iconForecast.setAttribute('src', './img/icons/ovc_+sn(1).svg')
					break;
				case 1225:
					weatherIcon.setAttribute('src', './img/icons/ovc_+sn(1).svg')
					iconForecast.setAttribute('src', './img/icons/ovc_+sn(1).svg')
					break;
				case 1237:
					weatherIcon.setAttribute('src', './img/icons/ovc_ha(1).svg')
					iconForecast.setAttribute('src', './img/icons/ovc_ha(1).svg')
					break;
				case 1240:
					weatherIcon.setAttribute('src', './img/icons/bkn_ra_n.svg')
					iconForecast.setAttribute('src', './img/icons/bkn_ra_n.svg')
					break;
				case 1243:
					weatherIcon.setAttribute('src', './img/icons/bkn_+ra_n.svg')
					iconForecast.setAttribute('src', './img/icons/bkn_+ra_n.svg')
					break;
				case 1246:
					weatherIcon.setAttribute('src', './img/icons/bkn_-ra_n.svg')
					iconForecast.setAttribute('src', './img/icons/bkn_-ra_n.svg')
					break;
				case 1249:
					weatherIcon.setAttribute('src', './img/icons/ovc_ra_sn(1).svg')
					iconForecast.setAttribute('src', './img/icons/ovc_ra_sn(1).svg')
					break;
				case 1252:
					weatherIcon.setAttribute('src', './img/icons/ovc_ra_sn(1).svg')
					iconForecast.setAttribute('src', './img/icons/ovc_ra_sn(1).svg')
					break;
				case 1255:
					weatherIcon.setAttribute('src', './img/icons/ovc_ra_sn(1).svg')
					iconForecast.setAttribute('src', './img/icons/ovc_ra_sn(1).svg')
					break;
				case 1258:
					weatherIcon.setAttribute('src', './img/icons/ovc_+sn(1).svg')
					iconForecast.setAttribute('src', './img/icons/ovc_+sn(1).svg')
					break;
				case 1261:
					weatherIcon.setAttribute('src', './img/icons/ovc_ha(1).svg')
					iconForecast.setAttribute('src', './img/icons/ovc_ha(1).svg')
					break;
				case 1264:
					weatherIcon.setAttribute('src', './img/icons/ovc_ha(1).svg')
					iconForecast.setAttribute('src', './img/icons/ovc_ha(1).svg')
					break;
				case 1273:
					weatherIcon.setAttribute('src', './img/icons/ovc_ts(1).svg')
					iconForecast.setAttribute('src', './img/icons/ovc_ts(1).svg')
					break;
				case 1276:
					weatherIcon.setAttribute('src', './img/icons/ovc_ts_ra(1).svg')
					iconForecast.setAttribute('src', './img/icons/ovc_ts_ra(1).svg')
					break;
				case 1279:
					weatherIcon.setAttribute('src', './img/icons/ovc_ts_ha(1).svg')
					iconForecast.setAttribute('src', './img/icons/ovc_ts_ha(1).svg')
					break;
				case 1282:
					weatherIcon.setAttribute('src', './img/icons/ovc_ts_ha(1).svg')
					iconForecast.setAttribute('src', './img/icons/ovc_ts_ha(1).svg')
					break;
				default:
					weatherIcon.setAttribute('src', './img/icons/skc_n.svg')
					iconForecast.setAttribute('src', './img/icons/skc_n.svg')
					break;
			}
		} else {
			switch (code) {
				case 1000:
					weatherIcon.setAttribute('src', './img/icons/skc_d.svg')
					iconForecast.setAttribute('src', './img/icons/skc_d.svg')
					break;
				case 1003:
					weatherIcon.setAttribute('src', './img/icons/bkn_d.svg')
					iconForecast.setAttribute('src', './img/icons/bkn_d.svg')
					break;
				case 1006:
					weatherIcon.setAttribute('src', './img/icons/ovc.svg')
					iconForecast.setAttribute('src', './img/icons/ovc.svg')
					break;
				case 1009:
					weatherIcon.setAttribute('src', './img/icons/ovc.svg')
					iconForecast.setAttribute('src', './img/icons/ovc.svg')
					break;
				case 1030:
					weatherIcon.setAttribute('src', './img/icons/fg_d.svg')
					iconForecast.setAttribute('src', './img/icons/fg_d.svg')
					break;
				case 1063:
					weatherIcon.setAttribute('src', './img/icons/bkn_-ra_d.svg')
					iconForecast.setAttribute('src', './img/icons/bkn_-ra_d.svg')
					break;
				case 1066:
					weatherIcon.setAttribute('src', './img/icons/bkn_-sn_d.svg')
					iconForecast.setAttribute('src', './img/icons/bkn_-sn_d.svg')
					break;
				case 1069:
					weatherIcon.setAttribute('src', './img/icons/bkn_-sn_d.svg')
					iconForecast.setAttribute('src', './img/icons/bkn_-sn_d.svg')
					break;
				case 1072:
					weatherIcon.setAttribute('src', './img/icons/bkn_ra_d.svg')
					iconForecast.setAttribute('src', './img/icons/bkn_ra_d.svg')
					break;
				case 1087:
					weatherIcon.setAttribute('src', './img/icons/ovc_ts.svg')
					iconForecast.setAttribute('src', './img/icons/ovc_ts.svg')
					break;
				case 1114:
					weatherIcon.setAttribute('src', './img/icons/-bl.svg')
					iconForecast.setAttribute('src', './img/icons/-bl.svg')
					break;
				case 1117:
					weatherIcon.setAttribute('src', './img/icons/bl.svg')
					iconForecast.setAttribute('src', './img/icons/bl.svg')
					break;
				case 1135:
					weatherIcon.setAttribute('src', './img/icons/fg_d.svg')
					iconForecast.setAttribute('src', './img/icons/fg_d.svg')
					break;
				case 1147:
					weatherIcon.setAttribute('src', './img/icons/fg_d.svg')
					iconForecast.setAttribute('src', './img/icons/fg_d.svg')
					break;
				case 1150:
					weatherIcon.setAttribute('src', './img/icons/bkn_-ra_d.svg')
					iconForecast.setAttribute('src', './img/icons/bkn_-ra_d.svg')
					break;
				case 1153:
					weatherIcon.setAttribute('src', './img/icons/bkn_-ra_d.svg')
					iconForecast.setAttribute('src', './img/icons/bkn_-ra_d.svg')
					break;
				case 1168:
					weatherIcon.setAttribute('src', './img/icons/bkn_ra_d.svg')
					iconForecast.setAttribute('src', './img/icons/bkn_ra_d.svg')
					break;
				case 1171:
					weatherIcon.setAttribute('src', './img/icons/bkn_+ra_d.svg')
					iconForecast.setAttribute('src', './img/icons/bkn_+ra_d.svg')
					break;
				case 1180:
					weatherIcon.setAttribute('src', './img/icons/bkn_-ra_d.svg')
					iconForecast.setAttribute('src', './img/icons/bkn_-ra_d.svg')
					break;
				case 1183:
					weatherIcon.setAttribute('src', './img/icons/bkn_-ra_d.svg')
					iconForecast.setAttribute('src', './img/icons/bkn_-ra_d.svg')
					break;
				case 1186:
					weatherIcon.setAttribute('src', './img/icons/bkn_-ra_d.svg')
					iconForecast.setAttribute('src', './img/icons/bkn_-ra_d.svg')
					break;
				case 1189:
					weatherIcon.setAttribute('src', './img/icons/bkn_ra_d.svg')
					iconForecast.setAttribute('src', './img/icons/bkn_ra_d.svg')
					break;
				case 1192:
					weatherIcon.setAttribute('src', './img/icons/bkn_+ra_d.svg')
					iconForecast.setAttribute('src', './img/icons/bkn_+ra_d.svg')
					break;
				case 1195:
					weatherIcon.setAttribute('src', './img/icons/bkn_+ra_d.svg')
					iconForecast.setAttribute('src', './img/icons/bkn_+ra_d.svg')
					break;
				case 1198:
					weatherIcon.setAttribute('src', './img/icons/bkn_-ra_d.svg')
					iconForecast.setAttribute('src', './img/icons/bkn_-ra_d.svg')
					break;
				case 1201:
					weatherIcon.setAttribute('src', './img/icons/bkn_+ra_d.svg')
					iconForecast.setAttribute('src', './img/icons/bkn_+ra_d.svg')
					break;
				case 1204:
					weatherIcon.setAttribute('src', './img/icons/bkn_-sn_d.svg')
					iconForecast.setAttribute('src', './img/icons/bkn_-sn_d.svg')
					break;
				case 1207:
					weatherIcon.setAttribute('src', './img/icons/bkn_+sn_d.svg')
					iconForecast.setAttribute('src', './img/icons/bkn_+sn_d.svg')
					break;
				case 1210:
					weatherIcon.setAttribute('src', './img/icons/ovc_-sn.svg')
					iconForecast.setAttribute('src', './img/icons/ovc_-sn.svg')
					break;
				case 1213:
					weatherIcon.setAttribute('src', './img/icons/bkn_-sn_d.svg')
					iconForecast.setAttribute('src', './img/icons/bkn_-sn_d.svg')
					break;
				case 1216:
					weatherIcon.setAttribute('src', './img/icons/ovc_sn.svg')
					iconForecast.setAttribute('src', './img/icons/ovc_sn.svg')
					break;
				case 1219:
					weatherIcon.setAttribute('src', './img/icons/bkn_sn_d.svg')
					iconForecast.setAttribute('src', './img/icons/bkn_sn_d.svg')
					break;
				case 1222:
					weatherIcon.setAttribute('src', './img/icons/ovc_+sn.svg')
					iconForecast.setAttribute('src', './img/icons/ovc_+sn.svg')
					break;
				case 1225:
					weatherIcon.setAttribute('src', './img/icons/ovc_+sn.svg')
					iconForecast.setAttribute('src', './img/icons/ovc_+sn.svg')
					break;
				case 1237:
					weatherIcon.setAttribute('src', './img/icons/ovc_ha.svg')
					iconForecast.setAttribute('src', './img/icons/ovc_ha.svg')
					break;
				case 1240:
					weatherIcon.setAttribute('src', './img/icons/bkn_ra_d.svg')
					iconForecast.setAttribute('src', './img/icons/bkn_ra_d.svg')
					break;
				case 1243:
					weatherIcon.setAttribute('src', './img/icons/bkn_+ra_d.svg')
					iconForecast.setAttribute('src', './img/icons/bkn_+ra_d.svg')
					break;
				case 1246:
					weatherIcon.setAttribute('src', './img/icons/bkn_-ra_d.svg')
					iconForecast.setAttribute('src', './img/icons/bkn_-ra_d.svg')
					break;
				case 1249:
					weatherIcon.setAttribute('src', './img/icons/ovc_ra_sn.svg')
					iconForecast.setAttribute('src', './img/icons/ovc_ra_sn.svg')
					break;
				case 1252:
					weatherIcon.setAttribute('src', './img/icons/ovc_ra_sn.svg')
					iconForecast.setAttribute('src', './img/icons/ovc_ra_sn.svg')
					break;
				case 1255:
					weatherIcon.setAttribute('src', './img/icons/ovc_ra_sn.svg')
					iconForecast.setAttribute('src', './img/icons/ovc_ra_sn.svg')
					break;
				case 1258:
					weatherIcon.setAttribute('src', './img/icons/ovc_+sn.svg')
					iconForecast.setAttribute('src', './img/icons/ovc_+sn.svg')
					break;
				case 1261:
					weatherIcon.setAttribute('src', './img/icons/ovc_ha.svg')
					iconForecast.setAttribute('src', './img/icons/ovc_ha.svg')
					break;
				case 1264:
					weatherIcon.setAttribute('src', './img/icons/ovc_ha.svg')
					iconForecast.setAttribute('src', './img/icons/ovc_ha.svg')
					break;
				case 1273:
					weatherIcon.setAttribute('src', './img/icons/ovc_ts.svg')
					iconForecast.setAttribute('src', './img/icons/ovc_ts.svg')
					break;
				case 1276:
					weatherIcon.setAttribute('src', './img/icons/ovc_ts_ra.svg')
					iconForecast.setAttribute('src', './img/icons/ovc_ts_ra.svg')
					break;
				case 1279:
					weatherIcon.setAttribute('src', './img/icons/ovc_ts_ha.svg')
					iconForecast.setAttribute('src', './img/icons/ovc_ts_ha.svg')
					break;
				case 1282:
					weatherIcon.setAttribute('src', './img/icons/ovc_ts_ha.svg')
					iconForecast.setAttribute('src', './img/icons/ovc_ts_ha.svg')
					break;
				default:
					weatherIcon.setAttribute('src', './img/icons/skc_d.svg')
					iconForecast.setAttribute('src', './img/icons/skc_d.svg')
					break;
			}
		}
	}
}

function displayWeather(lat, lon) {
	fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKeyWeather}&q=${lat},${lon}&lang=ru`)
		.then(response => response.json())
		.then(json => {
			cityName.textContent = json.location.name
			dateHour.textContent = dateConvert(json.location.localtime);
			temperature.textContent = Math.round(json.current.temp_c)
			celsiusLink.addEventListener('click', function (event) {
				event.preventDefault();
				temperature.textContent = Math.round(json.current.temp_c)
				celsiusLink.classList.add('active');
				fahrenheitLink.classList.remove('active');
			});
			fahrenheitLink.addEventListener('click', function (event) {
				event.preventDefault();
				temperature.textContent = Math.round(json.current.temp_f);
				fahrenheitLink.classList.add('active');
				celsiusLink.classList.remove('active');
			});
			weatherDescription.textContent = json.current.condition.text
			feelsLike.textContent = Math.round(json.current.feelslike_c);
			humidityLevel.textContent = json.current.humidity;
			windSpeed.textContent = Math.round(json.current.wind_kph);

			nightMode(json.location.localtime);
			mainIcon(json.current.condition.code, null);
			todayForecast(lat, lon);
		})
}

locationButton.addEventListener('click', function () {
	navigator.geolocation.getCurrentPosition(getPosition);
});

function getPosition(position) {
	let lat = position.coords.latitude;
	let lon = position.coords.longitude;
	listForecast.innerHTML = '';
	displayWeather(lat, lon)
	today.classList.add('active')
	week.classList.remove('active')
	fourteenDays.classList.remove('active')
}

function todayForecast(lat, lon) {
	fetch(`https://api.weatherapi.com/v1//forecast.json?key=${apiKeyWeather}&q=${lat},${lon}&lang=ru&days=1`)
		.then(response => response.json())
		.then(json => {
			let hours = json.forecast.forecastday[0].hour
			for (let i = 0; i < hours.length; i++) {
				let itemForecast = document.createElement('li')
				let titleForecast = document.createElement('h2')
				let iconForecast = document.createElement('img')
				let tempForecast = document.createElement('div')
				let descriptionForecast = document.createElement('div')
				let minTempForecast = document.createElement('span')
				let maxTempForecast = document.createElement('span')

				itemForecast.classList.add('item-forecast')
				titleForecast.classList.add('title-forecast')
				iconForecast.classList.add('icon-forecast')
				tempForecast.classList.add('temp-forecast')
				descriptionForecast.classList.add('description-forecast')
				minTempForecast.classList.add('min-temp')
				maxTempForecast.classList.add('max-temp')

				listForecast.append(itemForecast)
				itemForecast.append(titleForecast)
				itemForecast.append(iconForecast)
				itemForecast.append(tempForecast)
				itemForecast.append(descriptionForecast)
				let currentDate = new Date(hours[i].time)
				titleForecast.textContent = `${currentDate.getHours().toString().length > 1 ? currentDate.getHours() : '0' + currentDate.getHours()} : 00`
				mainIcon(hours[i].condition.code, iconForecast)
				tempForecast.textContent = `${Math.round(hours[i].temp_c)} °C`
				descriptionForecast.textContent = hours[i].condition.text
			}
			displayForecast(lat, lon)
		})
}
function weekForecast(lat, lon) {
	fetch(`https://api.weatherapi.com/v1//forecast.json?key=${apiKeyWeather}&q=${lat},${lon}&lang=ru&days=7`)
		.then(response => response.json())
		.then(json => {
			const daysWeek = [
				'Воскресенье',
				'Понедельник',
				'Вторник',
				'Среда',
				'Четверг',
				'Пятница',
				'Суббота'
			];
			let days = json.forecast.forecastday
			for (let j = 0; j < days.length; j++) {
				let itemForecast = document.createElement('li')
				let titleForecast = document.createElement('h2')
				let iconForecast = document.createElement('img')
				let tempForecast = document.createElement('div')
				let descriptionForecast = document.createElement('div')
				let minTempForecast = document.createElement('span')
				let maxTempForecast = document.createElement('span')

				itemForecast.classList.add('item-forecast')
				titleForecast.classList.add('title-forecast')
				iconForecast.classList.add('icon-forecast')
				tempForecast.classList.add('temp-forecast')
				descriptionForecast.classList.add('description-forecast')
				minTempForecast.classList.add('min-temp')
				maxTempForecast.classList.add('max-temp')

				listForecast.append(itemForecast)
				itemForecast.append(titleForecast)
				itemForecast.append(iconForecast)
				itemForecast.append(tempForecast)
				itemForecast.append(descriptionForecast)

				let currentDate = new Date(days[j].date)
				titleForecast.textContent = daysWeek[currentDate.getDay()]
				mainIcon(days[j].day.condition.code, iconForecast)
				tempForecast.textContent = `от ${Math.round(days[j].day.mintemp_c)} до ${Math.round(days[j].day.maxtemp_c)}°C`
				descriptionForecast.textContent = days[j].day.condition.text
			}
		})
}
function fourteenDaysForecast(lat, lon) {
	fetch(`https://api.weatherapi.com/v1//forecast.json?key=${apiKeyWeather}&q=${lat},${lon}&lang=ru&days=14`)
		.then(response => response.json())
		.then(json => {
			const daysWeek = [
				'Воскресенье',
				'Понедельник',
				'Вторник',
				'Среда',
				'Четверг',
				'Пятница',
				'Суббота'
			];
			let days = json.forecast.forecastday
			for (let j = 0; j < days.length; j++) {
				let itemForecast = document.createElement('li')
				let titleForecast = document.createElement('h2')
				let iconForecast = document.createElement('img')
				let tempForecast = document.createElement('div')
				let descriptionForecast = document.createElement('div')
				let minTempForecast = document.createElement('span')
				let maxTempForecast = document.createElement('span')

				itemForecast.classList.add('item-forecast')
				titleForecast.classList.add('title-forecast')
				iconForecast.classList.add('icon-forecast')
				tempForecast.classList.add('temp-forecast')
				descriptionForecast.classList.add('description-forecast')
				minTempForecast.classList.add('min-temp')
				maxTempForecast.classList.add('max-temp')

				listForecast.append(itemForecast)
				itemForecast.append(titleForecast)
				itemForecast.append(iconForecast)
				itemForecast.append(tempForecast)
				itemForecast.append(descriptionForecast)

				let currentDate = new Date(days[j].date)
				titleForecast.innerHTML = `${daysWeek[currentDate.getDay()]}<br>${currentDate.getDate()}.${currentDate.getMonth().toString().length = 1 ? '0' + currentDate.getMonth() : currentDate.getMonth()}.${currentDate.getFullYear()}`
				mainIcon(days[j].day.condition.code, iconForecast)
				tempForecast.textContent = `от ${Math.round(days[j].day.mintemp_c)} до ${Math.round(days[j].day.maxtemp_c)}°C`
				descriptionForecast.textContent = days[j].day.condition.text
			}
		})
}
function displayForecast(lat, lon) {
	let today = document.getElementById('today')
	let week = document.getElementById('week')
	let fourteenDays = document.getElementById('fourteenDays')


	today.addEventListener('click', function (event) {
		if (!today.classList.contains('active')) {
			event.preventDefault();
			listForecast.innerHTML = '';
			today.classList.add('active')
			week.classList.remove('active')
			fourteenDays.classList.remove('active')
			todayForecast(lat, lon);
		}
	});

	week.addEventListener('click', function (event) {
		if (!week.classList.contains('active')) {
			event.preventDefault();
			listForecast.innerHTML = '';
			week.classList.add('active')
			today.classList.remove('active')
			fourteenDays.classList.remove('active')
			weekForecast(lat, lon);
		}
	});

	fourteenDays.addEventListener('click', function (event) {
		if (!fourteenDays.classList.contains('active')) {
			event.preventDefault();
			listForecast.innerHTML = '';
			fourteenDays.classList.add('active')
			today.classList.remove('active')
			week.classList.remove('active')
			fourteenDaysForecast(lat, lon);
		}
	});
}
geolocation();
displayWeather(56.87, 60.52);
