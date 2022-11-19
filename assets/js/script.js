var APIKey = "db2abe03dbd181408bf857199d38b427";
var currentDay = dayjs().format('M/D/YYYY');
var cityInput;
var cityLat = "";
var cityLon = "";
var futureForecast;
var cityNameDateEL = document.getElementById('name-date');
var fiveDayCards = document.getElementById('five-day');
var currentIconEl = document.getElementById('current-icon');
var currentTempEl = document.getElementById('curtemp');
var currentWindEl = document.getElementById('curwind');
var currentHumidEl = document.getElementById('curhumid');
var citySearchEl = document.getElementById('search-input');
var searchButtonEl = document.querySelector('#submit-btn');
var requestUrl = 'http://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}';

// Gathers users search parameter
var searchSubmit = function (event) {
    event.preventDefault();

    cityInput = citySearchEl.value.trim();
    console.log(cityInput)

    if (cityInput) {
        getCityLocation(cityInput);
        citySearchEl.value = '';
    } else {
        alert('Please enter a city name');
    }
};

// Gets the city lat and lon coordinates
// Country code https://www.iso.org/obp/ui/#search/code/
// https://www.freecodecamp.org/news/check-if-javascript-array-is-empty-or-not-with-length/
// https://www.digitalocean.com/community/tutorials/how-to-use-the-javascript-fetch-api-to-get-data
var getCityLocation = function (city) {
    var geoRequestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + ',840&limit=1&appid=' + APIKey;

    fetch(geoRequestUrl)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                    console.log(data);
                    if (data.length === 0) {
                        alert('City does not exist!');
                    } else {
                        cityLat = data[0].lat.toString();
                        cityLon = data[0].lon.toString();
                        getCurrentWeather();
                        getFutureWeather();
                    }
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Unable to connect to Open Weather');
        });
};

// Gets cities current weather by lat and lon coordinates
var getCurrentWeather = function (city) {
    var geoCurrentUrl = 'http://api.openweathermap.org/data/2.5/weather?lat=' + cityLat + '&lon=' + cityLon + '&appid=' + APIKey + "&units=imperial";

    fetch(geoCurrentUrl)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                    console.log(data);
                    var cityName = data.name;
                    var currentTemp = data.main.temp;
                    var currentWind = data.wind.speed;
                    var currentHumid = data.main.humidity;
                    var currentIcon = "http://openweathermap.org/img/wn/" + data.weather[0].icon + ".png";
                    cityNameDateEL.textContent = cityName + " " + currentDay;
                    currentTempEl.textContent = "Temp: " + currentTemp;
                    currentWindEl.textContent = "Wind: " + currentWind;
                    currentHumidEl.textContent = "Humidity: " + currentHumid;
                    currentIconEl.src = currentIcon;
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Unable to connect to Open Weather');
        });
};

// Gets cities future 5 day weather forecast
var getFutureWeather = function (city) {
    var geoCurrentUrl = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + cityLat + '&lon=' + cityLon + '&appid=' + APIKey + "&units=imperial";

    fetch(geoCurrentUrl)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                    console.log(data);
                    futureForecast = data.list;
                    displayFutureWeather(futureForecast);
                    // console.log(data.name);
                    // console.log(data.main.temp);
                    // console.log(data.wind.speed);
                    // console.log(data.main.humidity);
                    // console.log(currentIconEl);
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Unable to connect to Open Weather');
        });
};

// Displays the data into the 5 forecast cards

var displayFutureWeather = function (future) {
    var fiveDayForecast = [];
    // Grabs one forecast for each of the 5 days
    for (var i = 0; i < future.length; i++) {
        if (i % 8 == 0) {
            fiveDayForecast.push(future[i]);
        }
    }
    console.log(fiveDayForecast);
    var dayCount = 0;
    for (i = 0; i < fiveDayForecast.length; i++) {
        var fiveDate = document.querySelectorAll('.card-date');
        var fiveImage = document.querySelectorAll('.icon');
        var fiveTemp = document.querySelectorAll('#temp');
        var fiveWind = document.querySelectorAll('#wind');
        var fiveHumid = document.querySelectorAll('#humid');
        console.log(fiveDate);
        console.log(dayCount);

        fiveDate[i].textContent = dayjs().add(dayCount, 'day').format('M/D/YYYY');
        fiveImage[i].src = "http://openweathermap.org/img/wn/" + fiveDayForecast[i].weather[0].icon + ".png";
        fiveTemp[i].textContent = "Temp: " + fiveDayForecast[i].main.temp;
        fiveWind[i].textContent = "Wind: " + fiveDayForecast[i].wind.speed;
        fiveHumid[i].textContent = "Humidity: " + fiveDayForecast[i].main.humidity;
        dayCount++;
    }
};



//         var weatherIcon = document.createElement('img');
//         weatherIcon.src = "http://openweathermap.org/img/wn/" + fiveDayForecast[0].weather[0].icon + ".png";
//         weatherIcon.appendChild(listContainer);

//         var listTemp = document.createElement('li');
//         listTemp.textContent = fiveDayForecast[0].main.temp;
//         listTemp.appendChild(weatherIcon);

//         var listWind = document.createElement('li');
//         listWind.textContent = fiveDayForecast[0].wind.speed;
//         listWind.appendChild(listTemp);

//         var listHumid = document.createElement('li');
//         listHumid.textContent = fiveDayForecast[0].main.humidity;
//         listHumid.appendChild(listWind);

//         dayCount++;
//         console.log(futureHeader);
//     })


// };



// // var buttonClickHandler 
// var pastSearchButton = function (event) {
//     var prevCities = document.querySelector;


searchButtonEl.addEventListener('click', searchSubmit);
// pastSearchEl.addEventListener('click', buttonClickHandler);



// appending search history results
/* <div class="d-grid gap-2">
    <button id="search-history" class="btn btn-secondary" type="button">search results</button>
    <button id="search-history" class="btn btn-secondary" type="button">search results</button>
</div> */


// Javascript Object Test
// https://softauthor.com/create-html-element-in-javascript/
// fiveDayCards.appendChild(
//     Object.assign(
//         document.createElement('div'), {
//         classList: 'card bg-dark text-light col-2 mx-2',
//     }
//     )
// ).appendChild(
//     Object.assign(
//         document.createElement('h2'), {
//         classList: 'card-header',
//         textContent: dayjs().add(dayCount, 'day'),
//     }
//     )
// ).appendChild(
//     Object.assign(
//         document.createElement('img'), {
//         src: "http://openweathermap.org/img/wn/" + fiveDayForecast[0].weather[0].icon + ".png",
//     }
//     )
// ).appendChild(
//     Object.assign(
//         document.createElement('ul'), {
//         classList: 'list-group list-group-flush',
//     }
//     )
// ).insertAdjacentElement(
//     afterbegin(
//         document.createElement('li'), {
//         classList: "list-group-temp m-1",
//         textContent: fiveDayForecast[0].main.temp,
//     }
//     )
// ).insertAdjacentElement(
//     afterbegin(
//         document.createElement('li'), {
//         classList: "list-group-wind m-1",
//         textContent: fiveDayForecast[0].wind.speed,
//     }
//     )
// ).insertAdjacentElement(
//     afterbegin(
//         document.createElement('li'), {
//         classList: "list-group-humid m-1",
//         textContent: fiveDayForecast[0].main.humidity,
//     }
//     )
// )
// dayCount++;
// })
// };