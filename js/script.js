const apiKeyWeather = '8b106b724a27471cb6b154620240704'
const apiKeyGeolocation = '1f1b9591-3ccb-4212-a4ec-18f11d78b7af'

const elements = {
	body: document.querySelector('.body'),
	container: document.querySelector('.container'),
	locationButton: document.getElementById('location-button'),
	locationIcon: document.getElementById('location-icon'),
	inputSity: document.getElementById('city-input'),
	buttonSearchSity: document.getElementById('search-button'),
	forecast: document.getElementById('forecast'),
	footer: document.querySelector('.footer'),
	cityName: document.getElementById('city-name'),
	dateHour: document.getElementById('date-hour'),
	temperature: document.getElementById('temperature'),
	celsiusLink: document.getElementById('celsius-link'),
	fahrenheitLink: document.getElementById('fahrenheit-link'),
	weatherDescription: document.getElementById('weather-description'),
	weatherIcon: document.getElementById('weather-icon'), //
	feelsLike: document.getElementById('feels-like'),
	humidityLevel: document.getElementById('humidity-level'),
	windSpeed: document.getElementById('wind-speed'),
	listForecast: document.querySelector('.footer__list-forecast'),
	windDirection: document.querySelector('.wind-direction'),
	footerList: document.querySelector('.footer__list-forecast')
};


function addNightModeClasses(isNight) {
	const elementsToModify = [
		elements.body,
		elements.container,
		elements.locationButton,
		elements.inputSity,
		elements.buttonSearchSity,
		elements.footer,
		elements.forecast,
		elements.footerList
	];
	const iconSrc = isNight ? './img/location-dark.svg' : './img/location-light.svg';
	elements.locationIcon.setAttribute('src', iconSrc);


	elementsToModify.forEach(element => {
		element.classList.toggle('nightmode', isNight);
	});
}

let weatherIcons = {
	1000: './img/icons/skc',
	1003: './img/icons/bkn',
	1006: './img/icons/ovc',
	1009: './img/icons/ovc',
	1030: './img/icons/fg',
	1063: './img/icons/bkn_-ra',
	1066: './img/icons/bkn_-sn',
	1069: './img/icons/bkn_-sn',
	1072: './img/icons/bkn_ra',
	1087: './img/icons/ovc_ts',
	1114: './img/icons/-bl',
	1117: './img/icons/bl',
	1135: './img/icons/fg',
	1147: './img/icons/fg',
	1150: './img/icons/bkn_-ra',
	1153: './img/icons/bkn_-ra',
	1168: './img/icons/bkn_ra',
	1171: './img/icons/bkn_+ra',
	1180: './img/icons/bkn_-ra',
	1183: './img/icons/bkn_-ra',
	1186: './img/icons/bkn_-ra',
	1189: './img/icons/bkn_ra',
	1192: './img/icons/bkn_+ra',
	1195: './img/icons/bkn_+ra',
	1198: './img/icons/bkn_-ra',
	1201: './img/icons/bkn_+ra',
	1204: './img/icons/bkn_-sn',
	1207: './img/icons/bkn_+sn',
	1210: './img/icons/ovc_-sn',
	1213: './img/icons/bkn_-sn',
	1216: './img/icons/ovc_sn',
	1219: './img/icons/bkn_sn',
	1222: './img/icons/ovc_+sn',
	1225: './img/icons/ovc_+sn',
	1237: './img/icons/ovc_ha',
	1240: './img/icons/bkn_ra',
	1243: './img/icons/bkn_+ra',
	1246: './img/icons/bkn_-ra',
	1249: './img/icons/ovc_ra_sn',
	1252: './img/icons/ovc_ra_sn',
	1255: './img/icons/ovc_ra_sn',
	1258: './img/icons/ovc_+sn',
	1261: './img/icons/ovc_ha',
	1264: './img/icons/ovc_ha',
	1273: './img/icons/ovc_ts',
	1276: './img/icons/ovc_ts_ra',
	1279: './img/icons/ovc_ts_ha',
	1282: './img/icons/ovc_ts_ha'
};
function setIconSrc(iconForecast, code, isNight) {
	// Режим времени суток: "_d" - день, "_n" - ночь
	const timeMode = isNight ? '_n' : '_d';
	const imagePath = `${weatherIcons[code]}${timeMode}.svg`;
	iconForecast.setAttribute('src', imagePath);
	iconForecast.setAttribute('loading', 'lazy');
}

function mainIcon(code, iconForecast) {
	if (iconForecast) {
		setIconSrc(iconForecast, code);
	} else {
		setIconSrc(elements.weatherIcon, code);
	}
}

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


function toggleNightMode(date) {
	const currentDate = new Date(date)
	const hour = currentDate.getHours();
	const isNight = hour >= 19 || hour < 6;
	addNightModeClasses(isNight);
	return isNight;
}

async function displayWeather(lat, lon) {
	try {
		const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKeyWeather}&q=${lat},${lon}&lang=ru`);
		const json = await response.json();
		elements.cityName.textContent = json.location.name
		elements.dateHour.textContent = dateConvert(json.location.localtime);
		elements.temperature.textContent = Math.round(json.current.temp_c)
		elements.celsiusLink.addEventListener('click', function (event) {
			event.preventDefault();
			elements.temperature.textContent = Math.round(json.current.temp_c)
			elements.celsiusLink.classList.add('active');
			elements.fahrenheitLink.classList.remove('active');
		});
		elements.fahrenheitLink.addEventListener('click', function (event) {
			event.preventDefault();
			elements.temperature.textContent = Math.round(json.current.temp_f);
			elements.fahrenheitLink.classList.add('active');
			elements.celsiusLink.classList.remove('active');
		});
		elements.weatherDescription.textContent = json.current.condition.text;
		elements.feelsLike.textContent = Math.round(json.current.feelslike_c);
		elements.humidityLevel.textContent = json.current.humidity;
		elements.windSpeed.textContent = Math.round(json.current.wind_kph);

		toggleNightMode(json.location.localtime);
		todayForecast(lat, lon, json.location.localtime);
		mainIcon(json.current.condition.code, null);
		updateWindDirection(json.current.wind_dir);
	} catch (error) {
		console.error('Ошибка при получении погоды:', error);
	}
}

function createForecastItem(hourData) {
	const itemForecast = document.createElement('li');
	const titleForecast = document.createElement('h2');
	const iconForecast = document.createElement('img');
	const tempForecast = document.createElement('div');
	const descriptionForecast = document.createElement('div');

	itemForecast.classList.add('item-forecast');
	titleForecast.classList.add('title-forecast');
	iconForecast.classList.add('icon-forecast');
	tempForecast.classList.add('temp-forecast');
	descriptionForecast.classList.add('description-forecast');

	const currentDate = new Date(hourData.time);
	titleForecast.textContent = `${currentDate.getHours().toString().padStart(2, '0')}:00`;
	mainIcon(hourData.condition.code, iconForecast);
	tempForecast.textContent = `${Math.round(hourData.temp_c)} °C`;
	descriptionForecast.textContent = hourData.condition.text;

	itemForecast.appendChild(titleForecast);
	itemForecast.appendChild(iconForecast);
	itemForecast.appendChild(tempForecast);
	itemForecast.appendChild(descriptionForecast);

	return itemForecast;
}

async function todayForecast(lat, lon, time) {
	try {
		const response = await fetch(`https://api.weatherapi.com/v1//forecast.json?key=${apiKeyWeather}&q=${lat},${lon}&lang=ru&days=1`);
		const json = await response.json();
		const hours = json.forecast.forecastday[0].hour;
		const currentTime = new Date(time);
		const currentHour = currentTime.getHours();
		const forecastList = document.querySelector('.footer__list-forecast');
		let scrollOffset = 0;

		for (let i = 0; i < hours.length; i++) {
			const itemForecast = createForecastItem(hours[i]);
			forecastList.appendChild(itemForecast);

			if (currentHour === new Date(hours[i].time).getHours()) {
				scrollOffset = i * (forecastList.firstElementChild.offsetWidth + parseInt(getComputedStyle(forecastList.firstElementChild).marginRight));
			}
		}

		forecastList.scrollLeft = scrollOffset;
		displayForecast(lat, lon);
	} catch (error) {
		console.error('Ошибка при получении прогноза на сегодня:', error);
	}
}
async function weekForecast(lat, lon, numDays) {
	try {
		const response = await fetch(`https://api.weatherapi.com/v1//forecast.json?key=${apiKeyWeather}&q=${lat},${lon}&lang=ru&days=${numDays}`);
		const json = await response.json();
		const daysWeek = [
			'Воскресенье',
			'Понедельник',
			'Вторник',
			'Среда',
			'Четверг',
			'Пятница',
			'Суббота'
		];
		let forecastDays = json.forecast.forecastday;
		for (let j = 0; j < forecastDays.length; j++) {
			let itemForecast = document.createElement('li');
			let titleForecast = document.createElement('h2');
			let iconForecast = document.createElement('img');
			let tempForecast = document.createElement('div');
			let descriptionForecast = document.createElement('div');
			let minTempForecast = document.createElement('span');
			let maxTempForecast = document.createElement('span');

			itemForecast.classList.add('item-forecast');
			titleForecast.classList.add('title-forecast');
			iconForecast.classList.add('icon-forecast');
			tempForecast.classList.add('temp-forecast');
			descriptionForecast.classList.add('description-forecast');
			minTempForecast.classList.add('min-temp');
			maxTempForecast.classList.add('max-temp');

			elements.listForecast.append(itemForecast);
			itemForecast.append(titleForecast);
			itemForecast.append(iconForecast);
			itemForecast.append(tempForecast);
			itemForecast.append(descriptionForecast);

			let currentDate = new Date(forecastDays[j].date);
			titleForecast.innerHTML = `${daysWeek[currentDate.getDay()]}<br>${currentDate.getDate()}.${currentDate.getMonth().toString().length = 1 ? '0' + (currentDate.getMonth() + 1) : currentDate.getMonth() + 1}.${currentDate.getFullYear()}`;
			mainIcon(forecastDays[j].day.condition.code, iconForecast);
			tempForecast.textContent = `от ${Math.round(forecastDays[j].day.mintemp_c)} до ${Math.round(forecastDays[j].day.maxtemp_c)}°C`;
			descriptionForecast.textContent = forecastDays[j].day.condition.text;
		}
	} catch (error) {
		console.error('Ошибка при получении прогноза на неделю:', error);
	}
}
async function displayForecast(lat, lon) {
	let today = document.getElementById('today')
	let week = document.getElementById('week')
	let fourteenDays = document.getElementById('fourteenDays')


	today.addEventListener('click', function (event) {
		if (!today.classList.contains('active')) {
			event.preventDefault();
			elements.listForecast.innerHTML = '';
			today.classList.add('active')
			week.classList.remove('active')
			fourteenDays.classList.remove('active')
			todayForecast(lat, lon);

		}
	});

	week.addEventListener('click', function (event) {
		if (!week.classList.contains('active')) {
			event.preventDefault();
			elements.listForecast.innerHTML = '';
			week.classList.add('active')
			today.classList.remove('active')
			fourteenDays.classList.remove('active')
			weekForecast(lat, lon, 7);
		}
	});

	fourteenDays.addEventListener('click', function (event) {
		if (!fourteenDays.classList.contains('active')) {
			event.preventDefault();
			elements.listForecast.innerHTML = '';
			fourteenDays.classList.add('active')
			today.classList.remove('active')
			week.classList.remove('active')
			weekForecast(lat, lon, 14);
		}
	});
}
function updateWindDirection(wind) {
	const directions = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
	const degreeStep = 22.5;
	const index = Math.round(directions.indexOf(wind) * degreeStep);
	elements.windDirection.style.transform = `rotate(${index}deg)`;
}

async function geolocation() {
	elements.buttonSearchSity.addEventListener('click', async function (e) {
		e.preventDefault();
		let sityName = elements.inputSity.value;
		try {
			const response = await fetch(`https://catalog.api.2gis.com/3.0/items/geocode?q=${sityName}&fields=items.point&key=${apiKeyGeolocation}`);
			const json = await response.json();
			const coords = {
				lat: json.result.items[0].point.lat,
				lon: json.result.items[0].point.lon,
			};
			elements.listForecast.innerHTML = '';
			displayWeather(coords.lat, coords.lon);
			today.classList.add('active');
			week.classList.remove('active');
			fourteenDays.classList.remove('active');
		} catch (error) {
			console.error('Ошибка при получении геолокации:', error);
		}
	})
}




function handleLocationButtonClick(e) {
	e.preventDefault();
	try {
		navigator.geolocation.getCurrentPosition(getPosition);
	} catch (error) {
		console.error('Ошибка при получении геолокации:', error);
	}
}


function getPosition(position) {
	try {
		let lat = position.coords.latitude;
		let lon = position.coords.longitude;
		elements.listForecast.innerHTML = '';
		displayWeather(lat, lon);
		today.classList.add('active');
		week.classList.remove('active');
		fourteenDays.classList.remove('active');
	} catch (error) {
		console.error('Ошибка при получении позиции:', error);
	}
}


const pixelsPerWheelRotation = 190;

elements.listForecast.addEventListener('wheel', function (event) {
	if (event.deltaY !== 0) {
		const scrollLeft = elements.listForecast.scrollLeft + (event.deltaY > 0 ? pixelsPerWheelRotation : -pixelsPerWheelRotation);
		elements.listForecast.scrollTo({
			left: scrollLeft,
		});
		event.preventDefault();
	}
});
function init() {
	elements.locationButton.addEventListener('click', handleLocationButtonClick);
	geolocation();
	displayWeather(56.87, 60.52);
}

document.addEventListener('DOMContentLoaded', init);