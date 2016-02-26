
// module.exports 
module.exports = function(app) {
	var Todo = require("./models/todo");
	var express = require("express");
	var path = require("path");
	var fs = require("fs");  // file operations
	var validator = require("validator");
	// var assert = require("assert");
	// var glob = require("glob");

	// Data stored in memory

	var publications = require(path.join(__dirname, "../public/content/publications.json"))
	var centers = require(path.join(__dirname, "../public/content/centers.json"))

	// Express router (a sub Express application handling the HTTP API).
	var api_router = express.Router();

	// Middleware for all API requests
	api_router.use(function(request, response, next) {
		// console.log("API request");
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

	api_router.get("/publications", function(request, response) {
		// response.sendFile(path.join(__dirname, "../public/content/publications.json"));
		response.json(publications);
	});

	api_router.get("/centers", function(request, response) {
		// response.sendFile(path.join(__dirname, "../public/content/centers.json"));
		response.json(centers);
	});

	api_router.get("/docs/articleDir/:entry", function(request, response) {
		// Interpret user input
		var entry_path = path.join(__dirname, "../public/docs", request.params.entry, "articles");

		// Validation of user input
		// Check if entry is specified
		if (validator.equals(request.params.entry, "")) {
			response.status(400).send({error: "Docs entry must be provided."});
			return;  // terminate response
		} 

		if (validator.equals(request.params.entry, "undefined")) {
			response.status(400).send({error: "Request for 'undefined' entry."});
			return;  // terminate response
		} 

		// All static tests passed
		// assert.equal(typeof(request.params.entry), "string");
		fs.readdir(entry_path, function(error, files) {
			// debugger;
			if (error) {
				response.status(404).send({error: "Entry does not exist."});
			} else {
				// filter for file extension
				response.json(files.filter(function(name) {
					return(path.extname(name) === ".md");
				}))
			}
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
