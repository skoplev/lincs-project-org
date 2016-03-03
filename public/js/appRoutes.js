// Routes for main Angular application
var mod = angular.module("appRoutes", ["ngRoute", "Auth"]);

// mod.controller("TestCtrl", ["$scope", "messages", function($scope, messages) {
// }]);

mod.config(
	["$routeProvider", "$locationProvider", "authenticProvider",
	function($routeProvider, $locationProvider, authenticProvider)
{
	// console.log(authenticProvider);
	$routeProvider
		.when("/", {
			templateUrl: "/views/landing.html",
			controller: "LandingCtrl",
			resolve: {
				// authentic service dependency,
				// which is managed by the authenticProvider. The provider
				// can be accessed in the .config
				auth: ["authentic", function(authentic) {
					return authentic.isLoggedIn();
				}]
			}
		})
		.when("/login", {
			templateUrl: "views/login.html",
			controller: "LoginCtrl"
		})
		.when("/data-releases", {
			templateUrl: "/views/data-releases.html",
			resolve: {
				auth: ["authentic", function(authentic) {
					return authentic.isLoggedIn();
				}]
			}
		})
		.when("/publications", {
			templateUrl: "/views/publications.html",
			controller: "PublicationsCtrl",
			resolve: {
				auth: ["authentic", function(authentic) {
					return authentic.isLoggedIn();
				}]
			}
		})
		.when("/centers", {
			templateUrl: "/views/centers.html",
			controller: "CentersCtrl",
			resolve: {
				auth: ["authentic", function(authentic) {
					return authentic.isLoggedIn();
				}]
			}
		})
		.when("/docs/:entry/:article?", {
			templateUrl: "/views/docs.html",
			controller: "DocsCtrl",
			resolve: {
				auth: ["authentic", function(authentic) {
					return authentic.isLoggedIn();
				}]
			}
		})
		.when("/docs", {
			templateUrl: "/views/DocsIndex.html",
			controller: "DocsIndexCtrl",
			resolve: {
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
			templateUrl: "/libs/lincs-direct-access-tools/views/direct-access-tools.html",
			controller: "DirectAccessToolsCtrl",
			resolve: {
				auth: ["authentic", function(authentic) {
					return authentic.isLoggedIn();
				}]
			}
		})
		.when("/concierge", {
			templateUrl: "/views/concierge.html"
		})
		.when("/stories/:article", {
			templateUrl: "views/story.html",
			controller: "ReaderCtrl",
			resolve: {
				auth: ["authentic", function(authentic) {
					return authentic.isLoggedIn();
				}]
			}
		})
		.when("/news", {
			templateUrl: "/views/news.html",
			resolve: {
				auth: ["authentic", function(authentic) {
					return authentic.isLoggedIn();
				}]
			}
			// controller: "NewsCtrl",
			// ngInit: "init('news')"
		});
		// .otherwise({
		// 	redirectTo: "/"
		// });

	$locationProvider.html5Mode(true);
}]);
