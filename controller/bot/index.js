const router = require("express").Router();
const getWeather = require("./getweatherinfo");

router.post("/", function(req, res, next){
	const city = req.body.city;
	getWeather(city, res, next);
});

module.exports = router;