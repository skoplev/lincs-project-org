// Routes for main Angular application
var mod = angular.module("appRoutes", ["ngRoute"]);

mod.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider){
	$routeProvider
		.when("/", {
			templateUrl: "views/home.html"
			// controller: "MainCtrl"
		})
		.when("/data-releases", {
			templateUrl: "views/data-releases.html"
			// controller: "MainCtrl"
		})
		.when("/publications", {
			templateUrl: "views/publications.html",
			controller: "PublicationsCtrl"
		})
		.when("/docs", {
			templateUrl: "views/docs.html",
			controller: "DocsCtrl"
		})
		.when("/test", {
			templateUrl: "views/test.html"
			// controller: "MainCtrl"
		})
		.otherwise({
			redirectTo: "/"
		});


	$locationProvider.html5Mode(true);
}]);
