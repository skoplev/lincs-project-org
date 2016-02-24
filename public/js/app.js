"use strict";

// Lincs Angular application
angular.module("LincsApp", [
	"Main",  // main Angular module
	"Header",  // Header and navigation bar module
	"Footer",  // Footer module
	"Publications",  // LINCS publication controller
	"Centers",  // LINCS center controller
	"WikiIndex",  // index controller for all wiki entries
	"Wiki",  // wiki renderer
	"appRoutes",  // single page application routing
	"Docs"  // documentation page
]);
