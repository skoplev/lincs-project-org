mod = angular.module("DocsIndex", []);

mod.controller("DocsIndexCtrl", ["$scope", "$http", function($scope, $http) {
	// console.log("WIki index ctrl");

	$scope.docs = [];  // list of wiki info data

	// Get wiki information

	$http.get("/content/docs.json")
		.success(function(data) {
			$scope.docs = data;
			// console.log(data);
		})
		.error(function(data) {
			console.log(data);
		});

}]);