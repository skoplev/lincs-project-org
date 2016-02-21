// Header directive
var mod = angular.module("Header", []);

mod.directive("header", function() {
	return {
		restrict: "A",
		templateUrl: "../../partials/header.html",
		controller: ["$scope", function($scope) {
			// console.log("Header controller");
		}]
	}
});