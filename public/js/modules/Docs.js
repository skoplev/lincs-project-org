// Documentation module.
var mod = angular.module("Docs", []);
mod.controller("DocsCtrl",
	["$scope", "$http", "$sce", "$routeParams", "$location", "$anchorScroll", "$timeout", "$compile", "$window",
	function($scope, $http, $sce, $routeParams, $location, $anchorScroll, $timeout, $compile, $window) {

	$scope.site_url = "amp.pharm.mssm.edu/lincsprogram";
	$scope.title = $routeParams.entry;
	$scope.nav_entries = [];  // list of docs entries, Markdown file names. If empty indicates that nav is not loaded
	$scope.base_path = "docs/" + $routeParams.entry;
	$scope.documentation = "";  // current documentation, loaded and parsed dynamically
	$scope.mdfile = "index.md";  // currently selected .md file
	$scope.focus = {id: null};  // the current focus of the reader. Based on html ids of sections and corresponding ids in the nav bar.

	$scope.scrollHandler = function() {};  // the scroll callback function

	// Sidebar dynamic positioning
	if ($(window).width() > 768) {
		// not small
		$('#sidebar').affix({
		      offset: {
		        top: 50
		      }
		});
	}

	// Particular entry specified in url
	if (typeof $routeParams.article !== "undefined") {
		// $scope.setContentFile($routeParams.article + ".md");
		$scope.mdfile = $routeParams.article + ".md";
	}

	// FUNCTIONS
	// ------------------------------------------------------------

	$scope.init = function(mdfile) {
		// Get the list of all .md file entries in the documentation.
		$http.get("api/docs/articleDir/" + $routeParams.entry)
			.success(function(data) {

				// Timeout for debugging timing-related issues
				// $timeout(function() {
				$scope.nav_entries = data;
				// }, 100);

				// Load content of file and process
				$scope.loadContent(mdfile);
			})
			.error(function(data) {
				console.log(data);
			});
	}

	// Cleaup called after docs is destroyed, which for example happens on navigating to another page on the site.
	$scope.$on("$destroy", function() {
		// Delete scroll handler registered with JQuery.
		$(window).off("scroll", $scope.scrollHandler);
	});

	// Loads content in mdfile.
	// index.md treated as a special case.
	// Uses the /api/parsemd to retrieve parsed html, metadata, and the table of content
	$scope.loadContent = function(mdfile) {
		var api_request = "";
		if (mdfile === "index.md") {
			api_request = "api/parsemd/" + $scope.base_path + "/index.md";
		} else {
			api_request = "api/parsemd/" + $scope.base_path + "/articles/" + mdfile;
		}

		// Get .md file content from server and render content in the body of the documentation.
		$http.get(api_request)
			.success(function(data) {
				// update documentation html variable which updates the main content.
				$scope.documentation = $sce.trustAsHtml(data.html);

				// update url without refresh unless at root
				if (mdfile !== "index.md") {
					$location.update_path("/" + $scope.base_path + "/" + mdfile.split(".")[0]);
				} else {
					$location.update_path("/" + $scope.base_path);
				}

				// Update document sub navigation element based on toc (table of content) data.
				// First detect whether main navigation is loaded.
				if ($scope.nav_entries.length > 0) {
					// main navigation is already loaded
					openSubnavigation(mdfile.split(".")[0], data.toc);

					if ($location.hash()) {
						setFocus($location.hash());
					} else {
						setFocus(mdfile.split(".")[0]);
					}

				} else {
					// main nav is not yet loaded, setup callback function for when main nav loads.
					$scope.$watch("nav_entries", function() {
						// $timeout() ensures that the following is called after the rendering of the navigation elements, which are used by
						$timeout(function() {
							openSubnavigation(mdfile.split(".")[0], data.toc);

							if ($location.hash()) {
								setFocus($location.hash());
							} else {
								setFocus(mdfile.split(".")[0]);
							}
						}, 0);
					});
				}

				// Update scrolling (scollspy) behaviour after rendering of main document content.
				$timeout(function() {
					updateScrollSpy();

					// Update scroll spy on image load to account for final size of images and hence
					// of id positions on the page.
					$("#documentation").find("img").one("load", function() {
						updateScrollSpy();

						// anchor scroll from hash entries on image rendering
						if ($location.hash()) {
							$anchorScroll();
						}
					});

					// Update scrollspy on resize to account for new header positions.
					$(window).resize(function() {
						updateScrollSpy();
					})

				}, 0);

				// Handle url requests containing hash for section referencing.
				if ($location.hash()) {
					// Go to hash, timeout places the anchorscroll in the execution queue
					// after the update of the main view.
					$timeout(function() {
						$anchorScroll();  // goto hash
						setFocus($location.hash());
					}, 0);
				} else {
					$window.scrollTo(0, 0);  // to top
				}

				// Update the main edit button link
				updateEditButton(mdfile);

				// Update title callback functions that spawns a share button to get the hashed url for a header.
				// The timeout call ensures that the callback configuration is only initiated after the content
				// is rendered.
				$timeout(function() {
					makeShareButtons(mdfile);

					// Fix download links by adding target="_self" and prepending with file path.
					fixDownloadLinks();
				}, 0);
			})
			.error(function(data) {
				console.log("Error: ", data);
			});
	};

	$scope.gotoAnchor = function(anchor) {

		$location.hash(anchor);
		$anchorScroll();
		$location.hash([]);

		// $location.hash(anchor);
		// $anchorScroll();
		// $location.hash("");

		// update focus
		setFocus(anchor);
	};

	$scope.resetUrl = function() {
		// resetting url
		$location.update_path($scope.base_path, true);  // true: remember when going back, from angular-location-update
		$location.hash([]);  // remove hash from url
	};

	// Set the edit button reference
	setEditButtonHref = function(href) {
		$("#edit-button").attr("href", href);
	};

	updateEditButton = function(mdfile) {
		if (mdfile === "index.md") {
			setEditButtonHref("https://github.com/skoplev/lincs-project-org/edit/master/public/" + $scope.base_path + "/index.md");
		} else {
			setEditButtonHref("https://github.com/skoplev/lincs-project-org/edit/master/public/" + $scope.base_path + "/articles/" + mdfile);
		}
	}

	makeShareButtons = function(mdfile) {
		// select all elements with ids that are headers
		$("#documentation :header")
			.on("mouseenter", function(event) {
				// test if the entered element does not contain a share button
				if (!$(this).find("#share-button").length) {
					// remove previous share button (singleton).
					$("#documentation #share-button").fadeOut(400, function() {
						$(this).remove();
					});
					// ensure cleanup of hanging tooltips
					$("#documentation div.popover.ng-scope").remove();

					// get id 
					var id = $(this).attr("id");

					// reference url of section
					var url = $scope.site_url + "/" + $scope.base_path + "/" + mdfile.split(".")[0] + "#" + id;

					// create new share button on entered element
					var share_button_html = "<a id='share-button' class='btn btn-default pull-right glyphicon glyphicon-share bs-popover' data-content='" + url + "' data-trigger='click' data-placement='bottom'>url</a>";
					var share_button = $compile(share_button_html)($scope);  // compile for Angular hover
					$(event.toElement).append(share_button);
				}
			});
	}

	fixDownloadLinks = function() {
		$("#documentation").find("a").map(function() {
			// context of each <a> on loaded documentation view
			// Detect if <a> links to a file for download and add target="_self" if so
			// get the end string of the href url (separated by "/")
			try {
				var href_rear = ($(this).attr("href").split("/").pop());
				if (isFileName(href_rear)) {
					// set target specifying download on following the link
					$(this).attr("target", "_self");
				}
			}
			catch(err) {
				console.warn(err);
			}
		});
	}

	// Function for generating a HTML string for subnavigation with an anchor call.
	// String must be compiled in the scope.
	function navHtml(id, name, lvl) {
		// return "<li class=\"lvl" + lvl + "\"><a href='#' ng-click=\"gotoAnchor('" + id + "')\">" + name + "</a></li>";
		return "<li id=\"nav-" + id + "\" class=\"lvl" + lvl + "\"><a href='#' ng-click=\"gotoAnchor('" + id + "')\">" + name + "</a></li>";
	};

	// Guess whether input string refers to a file for download.
	// Warning: makes mistakes on web extensions...
	function isFileName(name) {
		illegal_first_chars = "!#$%&'@^`~+,.;=";
		web_extensions = [
			"html", "htm", "do", "jsp", "cgi", "fcgi", "php",  // file names
			"com", "net", "org", "edu", "uk"  // catch most common extensions
		];
		// Does the name contain a '.'?
		if (name.indexOf(".") === -1) {
			return false;
		}

		if (illegal_first_chars.indexOf(name[0]) > -1) {
			// first char of name is on banned list
			return false;
		}

		// Test if extension after "." is on the banned list. Warning: not comprehensive
		var extensions = name.split(".").pop();
		if(web_extensions.indexOf(extensions) !== -1) {
			return false;
		}

		return true;
	}

	// Opens a new subnavigation selection in the sidebar beneath the specified entry.
	// Deletes previous subnavigation elements.
	// toc is a table of content object.
	// id is the id for the navigation target under which to create the subnav (also the filename of the associated .md file.)
	openSubnavigation = function(id, toc) {
		// close previous subnavigation
		$("#subnav").remove();

		// Subnav render algorithm based on table of content data
		// ---------------------------------------------------------------
		// find navigation id
		var parent = $("#nav-" + id);  // find li nav parent

		// Check if the navigation element was found
		if (parent.length === 0) {
			console.warn("Navigation target not found: ", id);
		}

		var current = parent;

		var nav = [];
		var cur_lvl = 1  // current table of content depth level

		// Make new navigation ul and store as pointer for the rendering.
		nav[cur_lvl] = $("<ul>")
			.attr("id", "subnav")
			.attr("class", "nav")
			.appendTo(parent);

		// Loop through table of content data. Array with depth specified by elem.lvl
		// The algorithm maintains a pointer to current subnav and parent subnav. It loops
		// over the table of content data (which is stored in an array) and
		// stores the current tree level based on the elem.lvl of each array element.
		for (var i in toc.json) {
			var elem = toc.json[i];

			// Fix to elem slug where " (" translages to double dashes "--"
			elem.slug = elem.slug.replace(/--/g, "-");

			// Compile new navigation element in the current scope.
			// Contains a Angular function call to gotoAnchor().
			// input: #id, name, level (for style configuration)
			var new_ng_li = $compile(navHtml(elem.slug, elem.content, elem.lvl))($scope);

			if (elem.lvl > cur_lvl) {
				// move down navigation tree

				// new sub navigation list
				var new_nav = $("<ul>").attr("class", "nav");

				// add new navigation to pivot <li>
				current.append(new_nav);  
				// add the navigation element to the new nav
				new_nav.append(new_ng_li);
				// add the new nav to the navigation stack
				nav.push(new_nav);

				current = new_ng_li;  // new pivot <li>

				// update tree level
				cur_lvl = elem.lvl; 
			} else if (elem.lvl < cur_lvl) {
				// move up tree, backtrace
				// remove n layers of nav stack ensuring that the appropriate ancestor is on top of nav stack.
				for (var i = 0; i < cur_lvl - elem.lvl; i++) {
					nav.pop();
				}

				peek(nav).append(new_ng_li);  // add to ancestor nav
				current = new_ng_li;  // update <li> pivot
				cur_lvl = elem.lvl;
			} else {
				// same tree level, add to current pointer
				peek(nav).append(new_ng_li);
				current = new_ng_li;
			}
		};
	};

	// Changes the focus of the navigation and subnavigation bar. The focus referes to the id
	// which is extrapolated to "nav-<new_focus>" in the navbar.
	setFocus = function(new_focus) {

		// test if the suggested focus can be found in sidebar
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

	// Updates the scroll callback function looking for the closest 
	updateScrollSpy = function() {
		// var offset = 100;  // in pixels, the point from the top where the scroll point is considered
		var offset = 20;

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

		// Remove previous scroll callback stored in $scope.scrollHandler.
		// Cleans up the scroll callbacks when navigating in a particular docs entry.
		$(window).off("scroll", $scope.scrollHandler);

		// Update the scroll handler with closure on the all_ids, heights, heights_arr
		$scope.scrollHandler = function() {
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
				setFocus(new_focus);
			}
		}

		// Add the new scroll handler callback 
		$(window).on("scroll", $scope.scrollHandler);
	};

	// Gets last element of an array
	function peek(array) {
		return array[array.length - 1];
	}

}]);
