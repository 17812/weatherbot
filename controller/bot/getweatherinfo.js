const config = require("../../config"),
	  axios   = require("axios");
function sendResponse(text, status, res){
	result = {
	  	speech: text,
	  	displayText: text,
	  	source: config.app.name
	  }

	  res.status(status).json(result);
}
function getWeatherInfo(city, res, next){
	//Fetch Weather data for city
	console.log("Request Started");
	const url = 
	`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${config.openweathermap.APPID}&units=metric`;
	axios.get(url).then(function(response){
		let data = response.data;
		let message = `
		${city} : 
		The day's High is ${data.main.temp_max}C with a Low of ${data.main.temp_min}C. The current conditions for ${city} are ${data.weather[0].description}.
		`;
		sendResponse(message, 200, res);
	})
	.catch(function(err){
		console.log(err.message);
		sendResponse("There was an error retrieving weather info for " + city, 400, res);
	})
	
}

module.exports = getWeatherInfo;