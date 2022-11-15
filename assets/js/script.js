var APIKey = "db2abe03dbd181408bf857199d38b427/";
// var city;
var userSearchEl = document.querySelector('#search-input');
var requestUrl = 'http://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}';


https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}


var getCityName = function () {
    var userSearch = document.location.search;
    var cityName = userSearch;
    console.log(cityName)
    if (cityName) {
        userSearchEl.textContent = cityName;
        getCityWeather(cityName);
    } else {
        alert('City does not exist');
    }

};

var getCityWeather = function (city) {
    // var geoCurrent = 'http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit=5&appid={API key};
    var geoCurrentUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + ',&limit=1&appid=' + APIKey;

    fetch(geoCurrentUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                displayIssues(data);

            } else {
                alert('City does not exist');
            }
    });
};

getCityName();