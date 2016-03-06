var mod = angular.module("Webinars", []);

mod.controller("WebinarsCtrl", ["$scope", "$http", "$sce", "$timeout", function($scope, $http, $sce, $timeout) {
	$scope.webinars = [];

	$http.get("/content/webinars.json")
		.success(function(data) {
			// Sanitize embed urls, and trust abstracts as html.
			for (var i in data) {
				try {
					data[i].embed = $sce.trustAsResourceUrl(data[i].embed);
					data[i].abstract = $sce.trustAsHtml(data[i].abstract)
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

	// Toggle element on page
	$scope.toggle = function(id) {
		$("#" + id).toggleClass("hide");
	}
}])
