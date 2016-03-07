// Footer directive

var mod = angular.module("Footer", []);

mod.directive("footer", function() {
	return {
		restrict: "A",
		// templateUrl: "../../partials/footer.html",
		templateUrl: "partials/footer.html",
		controller: ["$scope", function($scope) {
		}]
	}
})
