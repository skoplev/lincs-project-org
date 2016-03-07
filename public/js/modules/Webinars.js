var mod = angular.module("Webinars", []);

mod.controller("WebinarsCtrl", ["$scope", "$http", "$sce", "$timeout", function($scope, $http, $sce, $timeout) {
	$scope.webinars = [];

	$scope.id_counter = 0;

	$http.get("/content/webinars.json")
		.success(function(data) {
			// Trust abstracts as html.
			for (var i in data.past) {
				try {
					data.past[i].abstract = $sce.trustAsHtml(data.past[i].abstract)
				}
				catch(err) {
					console.warn(err);
				}
			}

			$scope.webinars = data;  // store data in controller

		})
		.error(function(data) {
			console.error(data);
		});
}])

mod.directive("webinar", function() {
	return {
		scope: {
			data: "="
		},
		restrict: "A",
		templateUrl: "templates/WebinarTemp.html",
		controller: ["$scope", "$element", function($scope, $element) {
			// Toggle element on page
			$scope.toggleAbstract = function() {
				$element.find("#abstract").toggleClass("hide");
			}
		}]
	}
})