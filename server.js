// server.js

// init 
var express = require("express");
var validator = require("validator");
var mongoose = require("mongoose");
var path = require("path");
var bodyParser = require("body-parser");  // for getting POST parameters

// Express configuration
var app = express();  // init Express application
app.use(express.static(__dirname + "/public"));  // set static file folder

// Set port of application.
app.listen(8000);
console.log("Listening on port 8000");

app.use(bodyParser.json());  // enables json encoded POST requests
app.use(bodyParser.urlencoded({ extended: true }));  // enable encoded POST body

// mongoose interface to local mongodb database
mongoose.connect("mongodb://localhost/test");
var db = mongoose.connection;  // database handle

db.on("error", console.error.bind(console, "conenction error:"));
db.once("open", function() {
	// Do something after database connection has opened.
});

// Routes module
require("./serverModules/routes")(app);
