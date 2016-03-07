// Module which handles news
var mod = angular.module("News", []);

mod.controller("NewsCtrl", ["$scope", "$http", function($scope, $http) {
	// Load center data
	// $scope.type = "";
	$scope.articles = [];
	// $scope.centers = "";

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

	$scope.convertToSlug = function(text) {
		return text
		    .toLowerCase()
		    .replace(/ /g,'-')
		    .replace(/[^\w-]+/g,'');
	}

	$scope.buttonStyle = function(category) {
		style_map = {
			event: "btn-primary",
			release: "btn-success",
			news: "btn-warning",
		}

		if (category in style_map) {
			return style_map[category];
		} else {
			return "btn-default"
		}
	}

	$scope.filterBy = function(category) {
		$scope.articles = $scope.articles.filter(function(entry) {
			return entry.type === category;
		});

		// console.log("filtering...");
		return true;
	}
}]);

mod.directive("headline", function() {
	return {
		restrict: "A",
		scope: {
			data: "=",
			last: "="  // last element, used for separator
		},
		templateUrl: "templates/HeadlineTemp.html"
	}
})