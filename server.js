// server.js

// init 
var express = require("express");
var validator = require("validator");
var mongoose = require("mongoose");
var path = require("path");
var bodyParser = require("body-parser");  // for getting POST parameters

var passport = require("passport");
var session = require("express-session");
var cookierParser = require("cookie-parser");

var flash = require("connect-flash");


// Express configuration
var app = express();  // init Express application
app.use(express.static(__dirname + "/public"));  // set static file folder


app.use(bodyParser.json());  // enables json encoded POST requests
app.use(bodyParser.urlencoded({ extended: true }));  // enable encoded POST body

// Sessions and passports
app.use(session({
	secret: "asecretcode",
	resave: true,
	saveUninitialized: true
}));
app.use(passport.initialize()); 
app.use(passport.session());  // persistent login sessions

app.use(flash());

// mongoose interface to local mongodb database
mongoose.connect("mongodb://localhost/test");
var db = mongoose.connection;  // database handle

db.on("error", console.error.bind(console, "conenction error:"));
db.once("open", function() {
	// Do something after database connection has opened.
});

// Mongoose User model
// var User = require("./serverModules/models/user");

// Setup passport
require("./serverModules/config/passport")(passport);

// Routes module
require("./serverModules/routes")(app, passport);

// Set port of application and launch.
app.listen(8000);
console.log("Listening on port 8000");
