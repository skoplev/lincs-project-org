// Module which handles LINCS centers
var mod = angular.module("Centers", []);

mod.controller("CentersCtrl", ["$scope", "$http", function($scope, $http) {
	// Load center data
	$scope.centers = [];

	$http.get("/api/centers")
		.success(function(data) {
			$scope.centers = data;
		})
		.error(function(error) {
			console.log("Error: ", data);
		});
}]);

mod.directive("center", function() {
	return {
		restrict: "AE",
		scope: {
			data: "="
		},
		controller: ["$scope", function($scope) {
			// console.log("center controller");
		}],
		templateUrl: "templates/CenterTemp.html"
	}
});