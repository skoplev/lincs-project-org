// server.js

// init 
var express = require("express");
var mongoose = require("mongoose");
var path = require("path");
var bodyParser = require("body-parser");  // for getting POST parameters

// Express configuration
var app = express();  // init Express application
app.use(express.static(__dirname + "/public"));  // set static file folder

// Set port of application.
app.listen(8080);
console.log("Listening on port 8080");

app.use(bodyParser.json());  // enables json encoded POST requests
app.use(bodyParser.urlencoded({ extended: true }));  // enable encoded POST body

// mongoose interface to local mongodb database
mongoose.connect("mongodb://localhost/test")
var db = mongoose.connection;  // database handle

db.on("error", console.error.bind(console, "conenction error:"));
db.once("open", function() {
	// Do something after database connection has opened.
});

// Register Mongoose data model. Encapsulates the database connection.
var Todo = mongoose.model("Todo", {
	text: String
});

// Routes
// Load single view file
app.get("/", function(request, response) {
	// response.sendFile("./public/index.html");
	response.sendFile(path.join(__dirname, "public/index.html"));
});

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
