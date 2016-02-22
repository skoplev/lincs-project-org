// Routes for main Angular application
var mod = angular.module("appRoutes", ["ngRoute"]);

mod.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider){
	$routeProvider
		.when("/", {
			templateUrl: "views/home.html"
			// controller: "MainCtrl"
		})
		.when("/test", {
			templateUrl: "views/test.html"
			// controller: "MainCtrl"
		})
		.when("/data-releases", {
			templateUrl: "views/data-releases.html"
			// controller: "MainCtrl"
		})
		.otherwise({
			redirectTo: "/"
		});


	$locationProvider.html5Mode(true);
}]);
