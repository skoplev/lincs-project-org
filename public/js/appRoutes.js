// Routes for main Angular application
var mod = angular.module("appRoutes", ["ngRoute"]);

mod.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider){
	$routeProvider
		.when("/", {
			templateUrl: "/views/home.html"
			// controller: "MainCtrl"
		})
		.when("/data-releases", {
			templateUrl: "/views/data-releases.html"
			// controller: "MainCtrl"
		})
		.when("/publications", {
			templateUrl: "/views/publications.html",
			controller: "PublicationsCtrl"
		})
		// .when("/docs", {
		// 	templateUrl: "/views/docs.html",
		// 	controller: "DocsCtrl"
		// })
		.when("/centers", {
			templateUrl: "/views/centers.html",
			controller: "CentersCtrl"
		})
		// Wiki route with variable entry
		// .when("/wiki/:entry", {
		// 	templateUrl: "views/wiki.html",
		// 	controller: "WikiCtrl"
		// })
		.when("/docs/:entry/:article?", {
			templateUrl: "/views/docs.html",
			controller: "DocsCtrl"
		})
		// .when("/wiki", {
		// 	templateUrl: "views/wiki.html",
		// 	controller: "WikiCtrl"
		// })
		.when("/docs", {
			templateUrl: "/views/DocsIndex.html",
			controller: "DocsIndexCtrl"
		})
		.when("/tools", {
			// templateUrl: "views/tools.html",
			templateUrl: "/libs/lincs-direct-access-tools/partials/direct-access-tools.html",
			"controller": "DirectAccessToolsCtrl"
		})
		.when("/test", {
			templateUrl: "/views/test.html"
			// controller: "MainCtrl"
		});
		// .otherwise({
		// 	redirectTo: "/"
		// });

	$locationProvider.html5Mode(true);
}]);
