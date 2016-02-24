mod = angular.module("WikiIndex", []);

mod.controller("WikiIndexCtrl", ["$scope", "$http", function($scope, $http) {
	console.log("WIki index ctrl");

	$scope.wikis = [];  // list of wiki info data

	// Get wiki information

	$http.get("/content/wikis.json")
		.success(function(data) {
			$scope.wikis = data;
			// console.log(data);
		})
		.error(function(data) {
			console.log(data);
		});

}]);