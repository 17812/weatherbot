const express = require("express"),
	  http    = require("http"),
	  logger  = require("morgan"),
	  bodyParser = require("body-parser"),
	  colors = require("colors"),
	  config = require("./config"),
	  port = process.env.port || process.env.PORT || 7770,
	  app = express(),
	  server = http.createServer(app),
	  endpoint = "/api/v1";
	  botroute = require("./controller/bot");

app.use(logger("dev"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(endpoint + "/bot", botroute);

//404 not found
app.use(function(req, res, next){
	const err = new Error("Not found");
	err.status = 404;
	next(err);
});

//Main Error Handler
app.use(function(err, req, res, next){
	res.status(err.status || 500).json({
		error: {
			success: false,
			message: err.message || "Internal Server Error"
		}
	});
});

server.listen(port, function(){
	console.log(colors.green(`=> Server running on http://localhost:${port}`));
});
