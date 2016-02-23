// Documentation module.
var mod = angular.module("Docs", []);
// 
mod.controller("DocsCtrl", ["$scope", "$http", "$sce", function($scope, $http, $sce) {
	$scope.documentation = "";
	// Read documentaion markdown 

	$http.get("/api/docs")
		.success(function(data) {
			console.log(marked(data));
			$scope.documentation = $sce.trustAsHtml(marked(data));
		})
		.error(function(data) {
			console.log("Error: ", data);
		});

	$scope.text = "I'm text from angular";
	// console.log("DocsCtrl invoked.");
	// console.log(marked("Markdown content"));
}]);
