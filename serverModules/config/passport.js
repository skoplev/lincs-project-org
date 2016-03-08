// config/passport.js

var LocalStrategy = require("passport-local").Strategy;

var User = require("../models/user");

// Expose 
module.exports = function(passport) {

	// Serialize user for the session
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	// Deserialize the user
	passport.deserializeUser(function(id, done) {
		User.findById(id, function(error, user) {
			done(error, user);
		});
	});

	// Local signup
	passport.use("local-signup",
		new LocalStrategy(
			{
				usernameField: "email",
				passwordField: "password",
				passReqToCallback: true
			},
			function(req, email, password, done) {

				// next event loop iteration
				process.nextTick(function() {

					// check if user already exists
					User.findOne({ "local.email": email }, function(err, user) {
						if (err)
							return done(err);

						if (user) {
							// user exists, send message which can be accessed
							return done(null, false, req.flash("signupMessage", "Email is already taken."));
						} else {
							// user does not exist, create new user
							var newUser = new User();

							newUser.local.email = email;
							newUser.local.password = newUser.generateHash(password);

							// Save user
							newUser.save(function(err) {
								if (err)
									throw err;
								return done(null, newUser);
							});
						}
					})
				});
			}
		)
	);

	// Local login stategy
	passport.use("local-login", new LocalStrategy({
		usernameField: "email",
		passwordField: "password",
		passReqToCallback: true  // allows passing back request
	},
		function(req, email, password, done) {
			// console.log("user login");
			// Find user with the provided email
			User.findOne({ "local.email": email }, function(err, user) {
				if (err)
					return done(err);

				if (!user)
					return done(null, false, {message: "User not found."});

				if (!user.validPassword(password))
					return done(null, false, {message: "Invalid password."});

				return done(null, user);
			});
		}
	));

};



