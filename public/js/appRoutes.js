// Routes for main Angular application
var mod = angular.module("appRoutes", ["ngRoute"]);

mod.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider){
	$routeProvider
		.when("/", {
			templateUrl: "views/home.html",
			controller: "MainCtrl"
		})
		.when("/test", {
			templateUrl: "views/test.html",
			controller: "MainCtrl"
		});

	$locationProvider.html5Mode(true);
}]);
