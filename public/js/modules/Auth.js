// Login, logout etc
var mod = angular.module("Auth", []);

mod.controller("LoginCtrl",
	["$scope", "authentic",
	function($scope, authentic) {
	console.log("auth controller");
	// console.log(authentic);

	$scope.login = function() {
		$scope.error = false;
		$scope.disables = true;

		// Try to login using the authentication service, which rejects the 
		// promise if wrong user information are tried.
		authentic.login($scope.loginForm.email, $scope.loginForm.password)
			// handle successful promise
			.then(function() {
				console.log("login post request was successful. But could have rejected credentials.");
			})
			// handle error
			.catch(function() {
				console.log("some error");
			});
	}
}]);

// Authentication provider, which can be used in .config of routes.
// The use of Angular provider enables the services to be used in .config
// for front-end routing behaviour that depends on the authentication status.
mod.provider("authentic", function () {
	// some examples of user for future extension of this provider.
	var message = "hi";
	// This function can be called in Angular configuration blocks (.config)
	this.resolver = function() {
		console.log("resolver called");
		return true;
	}

	// The service. Get is used by Angular to construct the service instance.
	this.$get = [
		// dependencies of the service "provided"
		"$q", "$http", "$location",
		function($q, $http, $location)
	{
		// service instance containing functions
		return {
			// isLoggedIn() checks whether the user is authorized by submitting a GET request
			isLoggedIn: function() {
				console.log("isLoggedIn()");

				// Promise assessing whether the user is logged in
				var deferred = $q.defer();

				// Request authentication status through GET request
				$http.get("/auth")
					.success(function(logged_on) {
						if (logged_on) {
							// the user is authorized
							deferred.resolve();
						} else {
							// unauthorized
							console.log("must log in");
							deferred.reject();
							$location.url("/login");  // redirect
						}
					});
				// console.log(deferred.promise);
				return deferred.promise;  // return the promise
			},
			// login() requests the server for login with the provided email and password
			login: function(email, password) {
				console.log("login(), email: ", email, " pw: ", password);
				var deferred = $q.defer();  // contais promise to be returned

				$http.post("/auth/login", {email: email, password: password})
					.success(function(data, status) {
						// console.log(data);
						// console.log("data.status: ", data.status);

						if (status === 200) {
							// user = true;
							deferred.resolve();
						} else {
							console.log("not successfully logged in");
							// user = false;
							deferred.reject();
						}
					})

					// error handling
					.error(function(data) {
						user = false;
						deferred.reject();
					});

				return deferred.promise;
			}
		}  // end of return object
	}];
});


// // Provider
// mod.provider("messages", function() {
// 	// var messages = {};
// 	// messages.list = ["hi", "today"];

// 	var message = "hello";

// 	// messages
// 	// return messages;

// 	this.$get = ["$q", function($q) {
// 		return {};
// 	}];
// });

// function Message(text) {
//     this.text = text;
// }

// mod.provider("message", [function () {
//     var text = null;

//     this.setText = function (textString) {
//         text = textString;
//     };

//     this.$get = [function () {
//         return new Message(text);
//     }];
// }]);

// Provider example

// mod.provider("message", function() {
// 	return false;
// });

// // Constructor function
// function AuthenticConstructor() {
// 	// console.log("AuthConstructer()");
// 	// this.name = name;

// 	this.count = 0;

// 	this.increase = function() {
// 		this.count++;
// 	};
// };

// // Authentication provider, which can be used in .config of routes.
// mod.provider("authentic2", function authentic2Provider() {
// 	// console.log("inside provider");
// 	var message = "hi";

// 	// init
// 	this.setMessage = function(value) {
// 		message = value;
// 	};

// 	this.getMessage = function() {
// 		return message;
// 	};

// 	this.isLoggedIn = function() {
// 		console.log("isLoggedIn called");
// 		return true;

// 		// var deffered = $q.defer();

// 		// // if (user) {
// 		// // 	return true;
// 		// // } else {
// 		// // 	return false;
// 		// // }

// 		// $http.get("/auth")
// 		// 	.success(function(logged_on) {
// 		// 		if (logged_on) {
// 		// 			deferred.resolve();
// 		// 		} else {
// 		// 			console.log("must log in");
// 		// 			deferred.reject();
// 		// 			$location.url("/login");  // redirect
// 		// 		}
// 		// 	});
// 		// return deferred.promise;
// 	};

// 	this.$get = ["$q", function($q) {
// 		return {
// 			isLoggedIn: isLoggedIn
// 		};
// 		// return {test: "test"};
// 	}];
// });

