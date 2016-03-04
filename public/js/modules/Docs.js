// Documentation module.
var mod = angular.module("Docs", []);
mod.controller("DocsCtrl",
	["$scope", "$http", "$sce", "$routeParams", "$location", "$anchorScroll", "$timeout", "$compile",
	function($scope, $http, $sce, $routeParams, $location, $anchorScroll, $timeout, $compile) {
	$scope.title = $routeParams.entry;

	$scope.entries = [];  // list of docs entries, Markdown file names
	$scope.base_path = "/docs/" + $routeParams.entry;

	$scope.documentation = "";  // current documentation, loaded and parsed dynamically
	$scope.mdfile = "index.md";  // currently selected .md file

	$scope.focus = {id: null};  // the current focus of the reader. Based on html ids of sections and corresponding ids in the nav bar.

	// $http.get("/api/docs/" + $routeParams.entry + "/articleDir")
	$http.get("/api/docs/articleDir/" + $routeParams.entry)
		.success(function(data) {
			$scope.entries = data;
		})
		.error(function(data) {
			console.log(data);
		});

	$scope.setContentFile = function(mdfile) {
		$scope.mdfile = mdfile;
	};

	// Changes the focus of the navigation bar
	$scope.setFocus = function(new_focus) {
		// test if the suggested focus can be found
		if ($("#sidebar #nav-" + new_focus).length === 0) {
			console.warn("setFocus() called with invalid id: ", new_focus);
			return;
		}

		// Set the focus variable 
		$scope.focus.id = new_focus;

		// Remove previously selected
		$("#sidebar li.selected").removeClass("selected");

		// Add selected class to id
		$("#sidebar #nav-" + new_focus).addClass("selected");

		// Add selected class to all list parents of found focus
		$("#sidebar #nav-" + new_focus).parents("li").addClass("selected");
	};

	// Loads content in mdfile.
	// index.md treated as a special case.
	// Uses the /api/parsemd to retrieve parsed html, metadata, and the table of content
	$scope.loadContent = function(mdfile) {
		console.log("loadContent()", mdfile);
		var api_request = "";
		if (mdfile === "index.md") {
			api_request = "/api/parsemd" + $scope.base_path + "/index.md";
		} else {
			api_request = "/api/parsemd" + $scope.base_path + "/articles/" + mdfile;
		}

		// $http.get($scope.base_path + "/articles/" + $scope.mdfile)
		$http.get(api_request)
			.success(function(data) {
				// update documentation html variable
				$scope.documentation = $sce.trustAsHtml(data.html);
				// update url without refresh unless at root
				if (mdfile !== "index.md") {
					$location.update_path($scope.base_path + "/" + mdfile.split(".")[0]);
				} else {
					$location.update_path($scope.base_path);
					// $location.setFocus(); 
				}

				// Go to hash, timeout places the anchorscroll in the execution queue after the update of the view (due to documentaion beeing bound to the main view).
				if ($location.hash()) {
					$timeout(function() {
						$anchorScroll();
					}, 0);
				}

				$scope.openSubnavigation(mdfile.split(".")[0], data.toc);

				// Update scrolling behaviour after compilation
				// $timeout ensures that updateScrollSpy() is executed after the DOM has been updated.
				$timeout(function() {
					$scope.updateScrollSpy();
					$scope.setFocus(mdfile.split(".")[0]);
				}, 0);
			})
			.error(function(data) {
				console.log("Error: ", data);
			});
		// TODO: update navigation
	};

	// Function for generating a HTML string for subnavigation with an anchor call.
	// String must be compiled in the scope.
	function navHtml(id, name, lvl) {
		// return "<li class=\"lvl" + lvl + "\"><a href='#' ng-click=\"gotoAnchor('" + id + "')\">" + name + "</a></li>";
		return "<li id=\"nav-" + id + "\" class=\"lvl" + lvl + "\"><a href='#' ng-click=\"gotoAnchor('" + id + "')\">" + name + "</a></li>";
	};

	// Opens a new subnavigation selection in the sidebar beneath the specified entry.
	// Deletes previous subnavigation elements.
	// toc is a table of content object.
	// id is the id for the navigation target under which to create the subnav (also the filename of the associated .md file.)
	$scope.openSubnavigation = function(id, toc) {
		// close previous subnavigation
		$("#subnav").remove();

		// Subnav render algorithm based on table of content data
		// ---------------------------------------------------------------
		// find navigation id
		var parent = $("#nav-" + id);  // find li nav parent
		var current = parent;

		// Make new navigation ul and store as pointer for the rendering.
		var nav = $("<ul>")
			.attr("id", "subnav")
			.attr("class", "nav")
			.appendTo(parent);
		// console.log(nav_pointer);

		// var current = $("#" + id);  // current li element
		var nav_parent = null;

		var cur_lvl = 1  // current table of content depth level

		// Loop through table of content data. Array with depth specified by elem.lvl
		// The algorithm maintains a pointer to current subnav and parent subnav. It loops
		// over the table of content data (which is stored in an array) and
		// stores the current tree level based on the elem.lvl of each array element.
		for (var i in toc.json) {
			var elem = toc.json[i];

			// Compile new navigation element in the current scope.
			// Contains a Angular function call to gotoAnchor().
			// input: #id, name, level (for style configuration)
			var new_ng_li = $compile(navHtml(elem.slug, elem.content, elem.lvl))($scope);

			if (elem.lvl > cur_lvl) {
				// move down navigation tree
				// new sublist, update pivot pointer
				// parent = nav_pointer;  // update the parent nav
				nav_parent = nav;  // store parent nav

				// new sub navigation list, which is updated to current nav
				nav = $("<ul>").attr("class", "nav");

				// add new navigation to pivot <li>
				// parent.append(nav_pointer);  
				current.append(nav);  
				// parent.append($("<li>").append(nav_pointer));  
				// parent.append($("<li>").append(nav_pointer));  

				// add the navigation element
				nav.append(new_ng_li);

				current = new_ng_li;  // new pivot <li>
				// console.log()
				// update tree level
				cur_lvl = elem.lvl; 
			} else if (elem.lvl < cur_lvl) {
				// move up tree
				nav = nav_parent;  // backtrack nav
				nav.append(new_ng_li);  // add to parent nav
				current = new_ng_li;  // update <li> pivot
				cur_lvl = elem.lvl;
			} else {
				// same tree level, add to current pointer
				nav.append(new_ng_li);
				// parent = new_ng_li;
				current = new_ng_li;
			}
		};

	};

	// Updates the scroll callback function looking for the closest 
	$scope.updateScrollSpy = function() {
		var offset = 100;  // in pixels, the point from the top where the scroll point is considered

		var header_height = $("#header").outerHeight();

		// var scroll_items 

		// get all JQuery objects in the main documentation text area which has an id.
		// The elements retrieved are the ids of headers with matching ids in the navigation
		// sidebar.
		var all_ids = $("#documentation *[id]");

		// get 
		var all_id_vals = all_ids.map(function() {
			return this.id;
		});

		var heights = all_ids.map(function() {
			return $(this).offset().top;
		});
		var heights_arr = $.makeArray(heights);

		// Scroll callback function
		$(window).scroll(function() {

			// find scroll position on page
			var top = $(this).scrollTop();

			// Find the closest id
			var abs_diff = heights_arr.map(function(num) {
				// return Math.abs(num - top);
				return top - num + offset;  // pixel offset
			});

			// abs_diff
			var min_positive_dist = Infinity;
			var closest = null;
			for (var i = 0; i < abs_diff.length; i++) {
				var val = abs_diff[i];  // value considered
				if (val > 0 && val < min_positive_dist) {
				// if (val < min_positive_dist) {
					// new best, update
					min_positive_dist = val;
					closest = i;
				}
			}

			// Update focus if it changed
			var new_focus = all_id_vals[closest];
			if (new_focus !== undefined && $scope.focus.id !== new_focus) {
				$scope.setFocus(new_focus);
			}
		});
	};

	// $scope.loadIndex = function() {
	// 	// Get index markdown file
	// 	$http.get("/docs/" + $routeParams.entry + "/index.md")
	// 		.success(function(data) {
	// 			$scope.documentation = $sce.trustAsHtml(marked(data));

	// 			// Update url without refresh
	// 			$location.update_path($scope.base_path);
	// 		})
	// 		.error(function(data) {
	// 			console.log("Error: ", data);
	// 		});
	// };

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
		console.log("gotoAnchor()", anchor);
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

			// update focus
			$scope.setFocus(anchor);
	};

	$scope.test = function() {
		console.log("test");
	};

	$scope.resetUrl = function() {
		// resetting url
		$location.update_path($scope.base_path, true);  // true: remember when going back, from angular-location-update
		$location.hash([]);  // remove hash from url
	};

}]);


