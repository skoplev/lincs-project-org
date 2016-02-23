// Main module for the Lincs front end Angular application
var mod = angular.module("Main", []);

mod.controller("MainCtrl", ["$scope", "$http", function($scope, $http) {
	$scope.greeting = "Hrej from Angular";

	// Get data
	$http.get("/api/todos")
		.success(function(data) {
			$scope.todos = data;
		})
		.error(function(data) {
			console.log("Error: ", data);
		});
}]);
