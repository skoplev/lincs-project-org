// Article reader

var mod = angular.module("Reader", []);

mod.controller("ReaderCtrl", 
	["$scope", "$routeParams", "$http", "$sce",
	function($scope, $routeParams, $http, $sce) {

	$scope.text = "";
	$scope.meta;
	// Load article html
	var api_request = "/api/parsemd/stories/" + $routeParams.article + ".md";

	$http.get(api_request)
		.success(function(data) {
			$scope.text = $sce.trustAsHtml(data.html);
			$scope.meta = data.meta;
		})
		.error(function(data) {
			console.log("Error: ", data);
		});
}])