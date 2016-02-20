// Angular application
var app = angular.module("LincsApp", []);

app.controller("LincsCtrl", ["$scope", "$http", function($scope, $http) {
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
