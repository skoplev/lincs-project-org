// Module which handles LINCS centers
var mod = angular.module("News", []);

mod.controller("NewsCtrl", ["$scope", "$http", function($scope, $http) {
	console.log("News controller");
	// Load center data
	$scope.centers = [];

	$http.get("/api/articles")
		.success(function(data) {
			$scope.articles = data;
			// console.log($scope.articles);
		})
		.error(function(error) {
			console.log("Error: ", data);
		});
}]);
