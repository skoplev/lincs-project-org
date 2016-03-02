// Routes for main Angular application
var mod = angular.module("appRoutes", ["ngRoute", "Auth"]);

// mod.controller("TestCtrl", ["$scope", "messages", function($scope, messages) {
// }]);

mod.config(
	["$routeProvider", "$locationProvider", "authenticProvider",
	function($routeProvider, $locationProvider, authenticProvider)
{
	console.log(authenticProvider);
	$routeProvider
		.when("/", {
			templateUrl: "/views/landing.html",
			controller: "LandingCtrl"
		})
		.when("/login", {
			templateUrl: "views/login.html",
			controller: "LoginCtrl"
		})
		.when("/data-releases", {
			templateUrl: "/views/data-releases.html"
			// controller: "MainCtrl"
		})
		.when("/publications", {
			templateUrl: "/views/publications.html",
			controller: "PublicationsCtrl"
		})
		.when("/centers", {
			templateUrl: "/views/centers.html",
			controller: "CentersCtrl"
		})
		.when("/docs/:entry/:article?", {
			templateUrl: "/views/docs.html",
			controller: "DocsCtrl"
		})
		.when("/docs", {
			templateUrl: "/views/DocsIndex.html",
			controller: "DocsIndexCtrl",
			resolve: {
				// auth: function() {
				// 	console.log(authenticProvider);
				// 	authenticProvider.resolver();
				// 	console.log("resolve function");
				// 	return "all is good"
				// },

				// authentic service dependency,
				// which is managed by the authenticProvider. The provider
				// can be accessed in the .config
				auth: ["authentic", function(authentic) {
					return authentic.isLoggedIn();
				}]
			}
		})
		.when("/tools", {
			// templateUrl: "views/tools.html",
			templateUrl: "/libs/lincs-direct-access-tools/partials/direct-access-tools.html",
			controller: "DirectAccessToolsCtrl"
		})
		.when("/stories/:article", {
			templateUrl: "views/story.html",
			controller: "ReaderCtrl"
		})
		.when("/news", {
			templateUrl: "/views/news.html"
			// controller: "NewsCtrl",
			// ngInit: "init('news')"
		});
		// .otherwise({
		// 	redirectTo: "/"
		// });

	$locationProvider.html5Mode(true);
}]);
