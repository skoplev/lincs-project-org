// Documentation module.
var mod = angular.module("Wiki", []);
// 
mod.controller("WikiCtrl", ["$scope", "$http", "$sce", "$routeParams", function($scope, $http, $sce, $routeParams) {
	$scope.title = $routeParams.entry;
	$scope.documentation = "";  // current documentation, loaded and parsed dynamically
	$scope.entries = [];  // list of wiki entries, Markdown file names
	// Read documentaion markdown 

	// console.log($routeParams);

	// $scope.loadIndex();

	// $http.get("/api/wiki/" + $routeParams.entry + "/articleDir")
	$http.get("/api/wiki/articleDir/" + $routeParams.entry)
		.success(function(data) {
			$scope.entries = data;
			// console.log(data);
		})
		.error(function(data) {
			console.log(data);
		});

	$scope.loadContent = function(mdfile) {
		console.log("loading: ", mdfile);
		$http.get("/wiki/" + $routeParams.entry + "/articles/" + mdfile)
			.success(function(data) {
				$scope.documentation = $sce.trustAsHtml(marked(data));
			})
			.error(function(data) {
				console.log("Error: ", data);
			});

		// TODO: update navigation
	};

	$scope.loadIndex = function() {
		// Get index markdown file
		$http.get("/wiki/" + $routeParams.entry + "/index.md")
			.success(function(data) {
				$scope.documentation = $sce.trustAsHtml(marked(data));
			})
			.error(function(data) {
				console.log("Error: ", data);
			});
	};
	// $scope.loadIndex();
	// $scope.text = "I'm text from angular";
	// console.log("DocsCtrl invoked.");
	// console.log(marked("Markdown content"));
}]);
