mod = angular.module("DocsIndex", []);

mod.controller("DocsIndexCtrl", ["$scope", "$http", function($scope, $http) {
	$scope.docs = [];  // list of wiki info data

	// Get wiki information
	$http.get("content/docs.json")
		.success(function(data) {
			$scope.docs = data;
		})
		.error(function(data) {
			console.log(data);
		});
}]);