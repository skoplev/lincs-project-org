var Todo = require("./models/todo");
var express = require("express");
var path = require("path");

// module.exports 
module.exports = function(app) {


	// Express router (a sub Express application handling the HTTP API).
	var api_router = express.Router();

	// Middleware for all API requests
	api_router.use(function(request, response, next) {
		console.log("API request");
		next();  // next API function in stack
	});

	// Register routes with the main application
	app.use("/api", api_router);

	// API requests
	api_router.get("/", function(request, response) {
		response.json({message: "hruray!"});
	});

	// Get requests for all todo items
	api_router.get("/todos", function(request, response) {
		Todo.find(function(error, elements) {
			if (error)
				response.send(error);
			response.json(elements);
		});
	});

	api_router.post("/todos", function(request, response) {
		console.log(request.body);

		Todo.create({
			text: request.body.text,
			done: false
		}, function(error, todo) {
			// create callback
			if (error)
				response.send(error);

			// Find all todo entries and return as json.
			Todo.find(function(error, todos) {
				if (error)
					response.send(error)
				response.json(todos);
			});
		});
	});

	// app.get("/data-releases", function(request, response) {
	// 	response.redirect("#/data-releases");
	// })

	// Load single page application.
	// Wild card only applies after the above routes (order matters).
	app.get("*", function(request, response) {
		response.sendFile(path.join(__dirname, "../public/index.html"));
	});
}
