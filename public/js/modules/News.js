// Module which handles LINCS centers
var mod = angular.module("News", []);

mod.controller("NewsCtrl", ["$scope", "$http", function($scope, $http) {
	// Load center data
	$scope.centers = [];
	$scope.type = "";

	// Initialization function specifying which type of articles are to be requested
	$scope.init = function(type, n) {
		$scope.type = type;
		$scope.n = n;

		var query = "/api/articles?";
		if (type)
			query += "type=" + type;

		if (n)
			query += "&n=" + n;

		$http.get(query)
			.success(function(data) {
				$scope.articles = data;
			})
			.error(function(error) {
				console.log("Error: ", data);
			});
	};
}]);


mod.directive("headline", function() {
	return {
		restrict: "A",
		scope: {
			data: "="
		},
		templateUrl: "templates/HeadlineTemp.html"
	}
})