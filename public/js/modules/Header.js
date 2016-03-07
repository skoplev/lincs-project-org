// Header directive
var mod = angular.module("Header", ["mgcrea.ngStrap.tooltip"]);

mod.directive("header", function() {
	return {
		restrict: "A",
		// templateUrl: "../../partials/header.html",
		templateUrl: "partials/header.html",
		controller: ["$scope", function($scope) {
			$scope.LINCS_description = "NIH LINCS Program: Library of Integrated Network-based Cellular Signatures";
		}]
	}
});