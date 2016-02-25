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
		.when("/centers", {
			templateUrl: "views/centers.html",
			controller: "CentersCtrl"
		})
		// Wiki route with variable entry
		// .when("/wiki/:entry", {
		// 	templateUrl: "views/wiki.html",
		// 	controller: "WikiCtrl"
		// })
		.when("/wiki/:entry/:article?", {
			templateUrl: "views/wiki.html",
			controller: "WikiCtrl"
		})
		// .when("/wiki", {
		// 	templateUrl: "views/wiki.html",
		// 	controller: "WikiCtrl"
		// })
		.when("/wiki", {
			templateUrl: "views/wikiIndex.html",
			controller: "WikiIndexCtrl"
		})
		.when("/test", {
			templateUrl: "views/test.html"
			// controller: "MainCtrl"
		});
		// .otherwise({
		// 	redirectTo: "/"
		// });

	$locationProvider.html5Mode(true);
}]);
