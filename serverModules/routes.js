
// module.exports 
module.exports = function(app, passport) {
	var Todo = require("./models/todo");
	var express = require("express");
	var path = require("path");
	var fs = require("fs");  // file operations
	var validator = require("validator");
	var metaMarked = require("meta-marked");
	// var toc = require("marked-toc");
	var toc = require("markdown-toc");
	var url = require("url");  // parsing url requests

	// Load story metadata into memory
	var stories = readMetaData("stories/");

	// Data stored in memory

	var publications = require(path.join(__dirname, "../public/content/publications.json"))
	var centers = require(path.join(__dirname, "../public/content/centers.json"))

	// Download route relative to /public for docs files requests.
	// Using this solution enables better markdown specifications of download paths
	// without having to use <a href="file.pdf" target="_self"></a>
	// app.get("/download/:file_path(*)", function(request, response) {
	// 	response.sendFile(path.join(__dirname, "../public", request.params.file_path));
	// });

	app.get("/signup", function(request, response) {
		console.log(request.flash("signupMessage"));  // get flash message
		response.sendFile(path.join(__dirname, "../public/views/signup.html"));
	});

	// Middle ware checks for login
	app.get("/profile", isLoggedIn, function(request, response) {
		response.sendFile(path.join(__dirname, "../public/views/profile.html"))
	});


	// Express authentication router handling user sensitive requests.
	// ------------------------------------------------------------------
	var auth_router = express.Router();

	// Middleware 
	auth_router.use(function(request, response, next) {
		next();
	});

	// General error handling for the authentication router.
	// Error handling is specified by having 4 input arguments.
	auth_router.use(function(error, request, response, next) {
		console.error(error.stack);
		response.status(500).send("Internal server error");
		// terminates stack
	});

	app.use("/auth", auth_router);

	// /auth base returns boolean for whether user is logged in
	auth_router.get("/", function(request, response) {
		response.send(request.isAuthenticated());
	})

	// Returns user data if logged in
	auth_router.get("/who", function(request, response) {
		console.log("who request");
		// response.send(request.isAuthenticated() ? "logged in": 0);
		response.send(request.isAuthenticated() ? request.user : false);
	});

	// auth_router.post("/login", passport.authenticate("local-login", {
	// 	successRedirect: "/",
	// 	// failureRedirect: "/login",  // redirect to signup page
	// 	failureFlash: true  // enable flash messages
	// }));

	// Custom handling of passport authentication request
	auth_router.post("/login", function(request, response, next) {
		passport.authenticate("local-login", function(err, user, message) {
			// passport callback function which are called bound to the specied passport authentication strategy
			if (err) {
				// authentication error
				return next(err);  // assumes that error handler is next
			};

			if (!user) {
				// not correct
				// console.log(message);
				return response.status(400).send(message);
			};

			request.logIn(user, function(err) {
				if (err) {
					return next(err);
				}
				return response.status(200).send(message);
			});

			// console.log(err, user, password);
		})(request, response, next);
	});

	// Logout request by destroying session.
	auth_router.get("/logout", function(request, response) {
		// Destroy session and redirect 
		request.session.destroy(function(error) {
			// response.redirect("/");
			response.send(200);  // OK
		});
	});

	auth_router.post("/register", passport.authenticate("local-signup", {
		successRedirect: "/",
		failureRedirect: "/signup",
		failureFlash: true  // flash message enabled
	}));


	// Express router (a sub Express application handling the HTTP API).
	// ---------------------------------------------------------------
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


	// Training, safe to delete
	// Get requests for all todo items
	api_router.get("/todos", function(request, response) {
		Todo.find(function(error, elements) {
			if (error)
				response.send(error);
			response.json(elements);
		});
	});

	// Training, safe to delete
	api_router.post("/todos", function(request, response) {
		// console.log(request.body);

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

	// Get list of publications, assumed to be in most recent format.
	// n: number of publication data to retrieve.
	api_router.get("/publications", function(request, response) {
		// Get url parameters
		var url_request = url.parse(request.url, true);
		// response.sendFile(path.join(__dirname, "../public/content/publications.json"));

		if ("n" in url_request.query) {
			response.json(publications.slice(0, url_request.query.n));
		} else {
			// assumes all publications
			response.json(publications);
		}
	});

	// Get list of center data
	api_router.get("/centers", function(request, response) {
		// response.sendFile(path.join(__dirname, "../public/content/centers.json"));
		response.json(centers);
	});

	// Get Docs md file list in Docs entry
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

	// Api for retrieving news stories
	// n: number to retrieve
	// type: category
	// from: start from, 0-indexed
	api_router.get("/articles", function(request, response) {
		// Get url parameters
		var url_request = url.parse(request.url, true);

		// Default complete slice specification
		var istart = url_request.query["from"] || 0;
		var n = url_request.query["n"] || stories.length;

		if ("type" in url_request.query) {
			// Prefilter for type specified in url
			response.send(stories
				.filter(function(x) {
					return x.type === url_request.query["type"];
				})
				.slice(istart, istart + n)
			);
		} else {
			response.send(stories
				.slice(istart, istart + n)
			);
		}
	});

	// parses markdown files specified by path.
	// returns json object with meta fields (from front-matter YAML), html (generated from the markdown), and toc (table of content object).
	// TODO: id's generated by toc does not handle apostrophes the same wah as meta-marked.
	api_router.get("/parsemd/:mdpath(*)", function(request, response) {
 		// Read .md file
 		fs.readFile("public/" + request.params.mdpath, "utf8", function(error, data) {
 			if (error) {
 				response.status(404).send({error: "Entry does not exist."})
 			} else {
 				// var article = metaMarked(data, {sanitize: true});  // parse markdown for YAML metadata
 				var article = metaMarked(data);  // parse markdown for YAML metadata
 				// article.toc = toc.raw(article.markdown, {allowedChars: "'"});  // generate table of content
 				article.toc = toc(article.markdown);  // generate table of content
 				delete article.markdown;  // remove markdown so as not to send it
 				response.json(article);  // containing fields meta, html, and toc
 			}
 		});
	});

	// Load single page application.
	// Wild card only applies after the above routes (order matters).
	app.get("*", function(request, response) {
		// response.redirect("/login");
		response.sendFile(path.join(__dirname, "../public/index.html"));
	});
}

// Route middleware checking if user is logged in.
// Based on session.
function isLoggedIn(request, response, next) {
	if (!request.isAuthenticated()) {
		// response.status(401).redirect("/login");  // unauthorized code
		response.sendStatus(401);
	} else {
		next();
	}
	// response.redirect("/login");
}

// Read metadata from folder of md files with YAML metadata specification.
// Returns array of metadata sorted by the most recent entries.
var readMetaData = function(folder_path) {
	var fs = require("fs");
	var metaMarked = require("meta-marked");

	var meta_data = [];  // metadata sorted by date at last iteration
	// Loop over all files in stories folder
	try {
		fs.readdir("public/" + folder_path, function(error, files) {
			if (error) {
				// throw(error);
				console.log(error);
			}
			// 
			files.forEach(function(file_name) {
				// Read file
				fs.readFile("public/" + folder_path + file_name, "utf8", function(error, data) {
					if (error) 
						throw(error);
					// Read article including metadata
					try {
						var article = metaMarked(data);

						// Guess url if not provided
						if (article.meta["url"] === undefined) {
							article.meta.url = folder_path + file_name.split(".")[0];
						}

						// Store meta data
						meta_data.push(article.meta);

						// Check if last element
						if (file_name === files[files.length - 1]) {
							// Sort metadata by recent date
							meta_data = meta_data.sort(function(a, b) {
								return new Date(b.date) - new Date(a.date);
							});
						}

					}
					catch (error) {
						console.log("Error reading file: ", file_name, ". Error message: ", error);
					}

				});
			});
		});
	} catch (error) {
		console.log("Error: ", error);
	}

	return meta_data;
}
