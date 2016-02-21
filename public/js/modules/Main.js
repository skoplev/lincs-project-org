// Main module for the Lincs front end Angular application
var mod = angular.module("Main", []);

mod.controller("MainCtrl", ["$scope", "$http", function($scope, $http) {
	$scope.greeting = "Hrej from Angular";
	console.log("controller initialized");

	// Get data
	$http.get("/api/todos")
		.success(function(data) {
			console.log(data);
			$scope.todos = data;
			// console.log($scope.todos);
		})
		.error(function(data) {
			console.log("Error: ", data);
		});
}]);
