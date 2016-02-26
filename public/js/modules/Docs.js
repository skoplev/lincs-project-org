// Documentation module.
var mod = angular.module("Docs", []);
// 
mod.controller("DocsCtrl",
	["$scope", "$http", "$sce", "$routeParams", "$location", "$anchorScroll", "$timeout",
	function($scope, $http, $sce, $routeParams, $location, $anchorScroll, $timeout) {
	$scope.title = $routeParams.entry;

	$scope.entries = [];  // list of docs entries, Markdown file names
	$scope.base_path = "/docs/" + $routeParams.entry;

	$scope.documentation = "";  // current documentation, loaded and parsed dynamically
	$scope.mdfile = "../index.md";  // currently selected .md file

	// $http.get("/api/docs/" + $routeParams.entry + "/articleDir")
	$http.get("/api/docs/articleDir/" + $routeParams.entry)
		.success(function(data) {
			// console.log(data);
			$scope.entries = data;
		})
		.error(function(data) {
			console.log(data);
		});

	$scope.setContentFile = function(mdfile) {
		$scope.mdfile = mdfile;
	};

	// // Returns
	// $scope.getContent = function(mdfile) {
	// 	console.log("getting content...");
	// 	$http.get("/wiki/" + $routeParams.entry + "/articles/" + $scope.mdfile)
	// 		.success(function(data) {
	// 			return($sce.trustAsHtml(marked(data)))
	// 			// $scope.gotoAnchor($routeParams.section);
	// 		})
	// 		.error(function(data) {
	// 			return(data);
	// 			// console.log("Error: ", data);
	// 		});
	// }

	$scope.loadContent = function(mdfile) {
		// Set selected .md file path
		$scope.setContentFile(mdfile);

		// console.log("loading: ", mdfile);
		$http.get($scope.base_path + "/articles/" + $scope.mdfile)
			.success(function(data) {
				$scope.documentation = $sce.trustAsHtml(marked(data));

				// update url without refresh to 
				$location.update_path($scope.base_path + "/" + $scope.mdfile.split(".")[0]);

				// Go to hash, timeout places the anchorscroll in the execution queue after the update of the view (due to documentaion beeing bound to the main view).
				if ($location.hash()) {
					$timeout(function() {
						$anchorScroll();
					}, 0);
				}

			})
			.error(function(data) {
				console.log("Error: ", data);
			});
		// TODO: update navigation
	};

	$scope.loadIndex = function() {
		// Get index markdown file
		$http.get("/docs/" + $routeParams.entry + "/index.md")
			.success(function(data) {
				$scope.documentation = $sce.trustAsHtml(marked(data));

				// Update url without refresh
				$location.update_path($scope.base_path);
			})
			.error(function(data) {
				console.log("Error: ", data);
			});
	};

	// Initialization called, specified using data-ng-init="init()"
	$scope.init = function() {
		// if the optional article is provided as input.
		if (typeof $routeParams.article !== "undefined") {
			$scope.setContentFile($routeParams.article + ".md");
		}
	};

	// $scope.gotoHash = function() {
	// 	if ($location.hash()) {
	// 		var old = $location.hash();
	// 		$anchorScroll();
	// 		$location.hash(old);
	// 	}
	// };

	$scope.gotoAnchor = function(anchor) {
		// if ($location.hash()) {
			// var old = $location.hash();
			// console.log("anchor scroll: ", $location.hash());
			// console.log("anchor scroll: ", $location.hash);
			// console.log(old);
			// $anchorScroll("data-standards");
			// $location.hash(old);

			$location.hash(anchor);
			$anchorScroll();
			$location.hash("");
	};

	$scope.resetUrl = function() {
		// resetting url
		$location.update_path($scope.base_path, true);  // true: remember when going back, from angular-location-update
		$location.hash([]);  // remove hash from url
	};
}]);
