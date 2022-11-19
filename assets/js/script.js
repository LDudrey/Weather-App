var APIKey = "db2abe03dbd181408bf857199d38b427";
var cityInput;
var cityLat = "";
var cityLon = "";
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
                //  displayWeather();
                 cityName = data.name;
                var currentTemp = data.main.temp;
                var currentWind = data.wind.speed;
                var currentHumid = data.main.humidity;
                currentTempEl.textContent = "Temp: " + currentTemp;
                currentWindEl.textContent = "Wind: " +currentWind;
                currentHumidEl.textContent = "Humidity: " + currentHumid;
                 console.log(data.name);
                 console.log(data.main.temp);
                 console.log(data.wind.speed);
                 console.log(data.main.humidity);            
             });
         } else {
             alert('Error: ' + response.statusText);
         }
     })
     .catch(function (error) {
         alert('Unable to connect to Open Weather');
     });
};

// // Gets cities future weather by lat and lon coordinates
// var getFutureWeather = function (city) {
//     var geoCurrentUrl = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + cityLat + '&lon=' + cityLon + '&appid=' + APIKey + "&units=imperial";
    
//     fetch(geoCurrentUrl)
//     .then(function (response) {
//         if (response.ok) {
//             console.log(response);
//             response.json().then(function (data) {
//                 console.log(data); 
//                 cityName = city.name;

//             });
//         } else {
//             alert('Error: ' + response.statusText);
//         }
//     })
//     .catch(function (error) {
//         alert('Unable to connect to Open Weather');
//     });
// };

//var displayRepos
var displayWeather = function (repos, searchTerm) {
    if (repos.length === 0) {
      repoContainerEl.textContent = 'No repositories found.';
      return;
    }

    repoSearchTerm.textContent = searchTerm;

  for (var i = 0; i < repos.length; i++) {
    var repoName = repos[i].owner.login + '/' + repos[i].name;

    var repoEl = document.createElement('a');
    repoEl.classList = 'list-item flex-row justify-space-between align-center';
    repoEl.setAttribute('href', './single-repo.html?repo=' + repoName);

    var titleEl = document.createElement('span');
    titleEl.textContent = repoName;

    repoEl.appendChild(titleEl);

    var statusEl = document.createElement('span');
    statusEl.classList = 'flex-row align-center';

    if (repos[i].open_issues_count > 0) {
      statusEl.innerHTML =
        "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + ' issue(s)';
    } else {
      statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
    }

    repoEl.appendChild(statusEl);

    repoContainerEl.appendChild(repoEl);
  }
};


// // var buttonClickHandler 
// var pastSearchButton = function (event) {
//     var prevCities = document.querySelector;





//     // var displayIssues
// var displayPastSearch = function (cities) {

// var geoCurrent = 'http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit=5&appid={API key};
// var geoCurrentUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + ',&limit=1&appid=' + APIKey;

searchButtonEl.addEventListener('click', searchSubmit);
// pastSearchEl.addEventListener('click', buttonClickHandler);



// appending search history results
/* <div class="d-grid gap-2">
    <button id="search-history" class="btn btn-secondary" type="button">search results</button>
    <button id="search-history" class="btn btn-secondary" type="button">search results</button>
</div> */

// Git it Done page appending repositories
// <a class="list-item flex-row justify-space-between align-center" href="./single-repo.html?repo=LDudrey/Coding-Quiz">
/* <span>LDudrey/Coding-Quiz</span>
<span class="flex-row align-center">
    <i class="fas fa-check-square status-icon icon-success"></i>
    </span>
    </a> */

// 5-day Forecast Cards
/* <div class="card bg-dark text-light col-2 mx-2">
    <div class="card-header">Date</div>
    <ul class="list-group list-group-flush">
        <i>weather icon</i>
        <li class="list-group-item bg-dark text-light">temp</li>
        <li class="list-group-item bg-dark text-light">wind</li>
        <li class="list-group-item bg-dark text-light">humidity</li>
    </ul>
</div> */