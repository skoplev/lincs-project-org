// Module which handles LINCS centers
var mod = angular.module("News", []);

mod.controller("NewsCtrl", ["$scope", "$http", function($scope, $http) {
	// Load center data
	$scope.centers = [];
	$scope.type = "";


	$scope.init = function(type) {
		console.log("NewsCtrl init");

		if (type) {
			$http.get("/api/articles?type=" + type)
				.success(function(data) {
					$scope.articles = data;
				})
				.error(function(error) {
					console.log("Error: ", data);
				});
		} else {
			$http.get("/api/articles")
				.success(function(data) {
					$scope.articles = data;
				})
				.error(function(error) {
					console.log("Error: ", data);
				});
		}
	};
}]);
