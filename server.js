// server.js

// init 
var express = require("express");
var validator = require("validator");
var mongoose = require("mongoose");
// In memory mongoose database for testing. WARNING: overwrites all database connections.
var mockgoose = require("mockgoose");
mockgoose(mongoose);

var path = require("path");
var bodyParser = require("body-parser");  // for getting POST parameters

var passport = require("passport");
var session = require("express-session");
var cookierParser = require("cookie-parser");

var flash = require("connect-flash");  // flash messaging

var request = require("request");  // for sending POST requests


// Express configuration
var app = express();  // init Express application

var app_name = "lincsprogram";  // the domain base name

// self domain reference for sending post request to the server.
var domain = "localhost:5000";
// var domain = "amp.pharm.mssm.edu";

var public_dir = path.join(__dirname, "/public");  // server public directory

// app.use(express.static(public_dir));  // set static file folder, served at "/:
app.use("/" + app_name + "/", express.static(__dirname + "/public"));  // set static file folder, served at /app_name/


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

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
	// Do something after database connection has opened.
});

// Mongoose User model
// var User = require("./serverModules/models/user");

// Setup passport
require("./serverModules/config/passport")(passport);

// Routes module
require("./serverModules/routes")(app, passport, app_name);

// Set port of application and launch.
app.listen(5000);
console.log("Listening on port 5000");


// Register requests for users. Run only for development when there are no 
// database set up.
request.post(
	"http://" + domain + "/" + app_name + "/auth/register",
	{ form: {email: "cat", password: "cat"}},
	function(err) {
		if (err)
			console.error(err);
	}
)

request.post(
	"http://" + domain + "/" + app_name + "/auth/register",
	{ form: {email: "lincs_uci", password: "lincs_uci"}},
	function(err) {
		if (err)
			console.error(err);
	}
)
