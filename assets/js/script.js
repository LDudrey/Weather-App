var APIKey = "db2abe03dbd181408bf857199d38b427/";
var cityName;
var citySearchEl = document.getElementById('search-input');
var searchButtonEl = document.querySelector('#submit-btn');
var requestUrl = 'http://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}';


// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}


// var formSubmitHandler
var searchSubmit = function (event) {
    event.preventDefault();

    cityName = citySearchEl.value.trim();
    console.log(cityName)
    if (cityName) {
        getCityName(cityName);

        repoContainerEl.textContent = '';
        citySearchEl.value = '';
    } else {
        alert('Please enter a city name');
    }
};

// var buttonClickHandler 
var pastSearchButton = function (event) {
    var prevCities = document.querySelector;
  
    if (prevCities) {
        getCityName(prevCities);
  
      repoContainerEl.textContent = '';
    }
  };

// var getCityName = function () {
//     var geoCurrentUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + ',&limit=1&appid=' + APIKey;
//     cityName = userQuery;
//     if (cityName) {
//         citySearchEl.textContent = cityName;
//         getCityLocation(cityName);
//     } else {
//         alert('City does not exist');
//     }
//     console.log(cityName)
// };

var getCityName = function (user) {
    var geoCurrentUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + ',&limit=1&appid=' + APIKey;
  
    fetch(geoCurrentUrl)
      .then(function (response) {
        if (response.ok) {
          console.log(response);
          response.json().then(function (data) {
            console.log(data);
            displayRepos(data, user);
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
      .catch(function (error) {
        alert('City does not exist');
      });
  };


// var geoCurrent = 'http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit=5&appid={API key};
// var geoCurrentUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + ',&limit=1&appid=' + APIKey;

searchButtonEl.addEventListener('submit', searchSubmit);




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