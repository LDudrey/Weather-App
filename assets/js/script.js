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
var searchButtonEl = document.getElementById('submit-btn');
var searchHistoryEl = document.getElementById('search-history');
var searchHistory;


// Gathers users search parameter
var searchSubmit = function (event) {
    event.preventDefault();

    cityInput = citySearchEl.value.trim();

    if (cityInput) {
        getCityLocation(cityInput);
        citySearchEl.value = '';
    } else {
        alert('Please enter a city name');
    }
};

// Gets the city lat and lon coordinates
// Country code https://www.iso.org/obp/ui/#search/code/
// https://www.digitalocean.com/community/tutorials/how-to-use-the-javascript-fetch-api-to-get-data
var getCityLocation = function (city) {
    var geoRequestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + ',840&limit=1&appid=' + APIKey;

    fetch(geoRequestUrl)
        .then(function (response) {
            if (response.ok) {
                // console.log(response);
                response.json().then(function (data) {
                    // console.log(data);
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
                // console.log(response);
                response.json().then(function (data) {
                    // console.log(data);
                    var cityName = data.name;
                    var currentTemp = data.main.temp;
                    var currentWind = data.wind.speed;
                    var currentHumid = data.main.humidity;
                    var currentIcon = "http://openweathermap.org/img/wn/" + data.weather[0].icon + ".png";
                    saveHistory(cityName);
                    document.getElementById("current-card").classList.remove("invisible");
                    document.getElementById("forecast").classList.remove("invisible");
                    cityNameDateEL.textContent = cityName + " " + currentDay;
                    currentTempEl.textContent = "Temp: " + currentTemp + " \u00B0F";
                    currentWindEl.textContent = "Wind: " + currentWind + " MPH";
                    currentHumidEl.textContent = "Humidity: " + currentHumid + " \u0025";
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
                // console.log(response);
                response.json().then(function (data) {
                    // console.log(data);
                    futureForecast = data.list;
                    displayFutureWeather(futureForecast);
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
    // Grabs one 3 hour increment forecast for each of the 5 days
    for (var i = 0; i < future.length; i++) {
        if (i % 8 == 0) {
            fiveDayForecast.push(future[i]);
        }
    }
    // console.log(fiveDayForecast);
    var dayCount = 0;
    for (i = 0; i < fiveDayForecast.length; i++) {
        var fiveDate = document.querySelectorAll('.card-date');
        var fiveImage = document.querySelectorAll('.icon');
        var fiveTemp = document.querySelectorAll('#temp');
        var fiveWind = document.querySelectorAll('#wind');
        var fiveHumid = document.querySelectorAll('#humid');
        var fiveCards = document.querySelectorAll("#daycard");
        fiveCards[i].classList = 'card bg-dark text-light col-2 m-2';
        fiveDate[i].textContent = dayjs().add(dayCount, 'day').format('M/D/YYYY');
        fiveImage[i].src = "http://openweathermap.org/img/wn/" + fiveDayForecast[i].weather[0].icon + ".png";
        fiveTemp[i].textContent = "Temp: " + fiveDayForecast[i].main.temp + " \u00B0F";
        fiveWind[i].textContent = "Wind: " + fiveDayForecast[i].wind.speed + " MPH";
        fiveHumid[i].textContent = "Humidity: " + fiveDayForecast[i].main.humidity + " \u0025";
        dayCount++;
    }
};

// Tutor assistance with saveHistory, init and recallHistory functions
var saveHistory = function (cities) {
    var searchHistory = JSON.parse(localStorage.getItem('cities')) || [];
    searchHistory = searchHistory.filter(removeDups);
    searchHistory.push(cities);
    localStorage.setItem('cities', JSON.stringify(searchHistory));
    init();
};

// Runs on page load to populate previous search history
function init() {
    searchHistoryEl.innerHTML = "";
    var cities = JSON.parse(localStorage.getItem("cities"));
    if (!cities) {
        return;
    } else {
        cities = cities.filter(removeDups);
        for (i = 0; i < cities.length; i++) {
            var histBtn = document.createElement('button');
            histBtn.classList = 'btn btn-light text-dark m-1';
            histBtn.textContent = cities[i];
            searchHistoryEl.append(histBtn);
        }
    }
};

// Function to check array for any duplicates
// https://stackoverflow.com/questions/9229645/remove-duplicate-values-from-js-array
// https://www.javascripttutorial.net/array/javascript-remove-duplicates-from-array/
// https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
function removeDups(value, index, array) {
    return array.indexOf(value) === index;
}

// Grabs the text from the previous search buttons
function recallHistory(event) {
    var histText = event.srcElement.innerHTML
    // console.log(histText);
    getCityLocation(histText);
};

searchHistoryEl.addEventListener('click', recallHistory);
searchButtonEl.addEventListener('click', searchSubmit);
init();

