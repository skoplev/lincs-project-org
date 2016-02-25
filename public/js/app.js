"use strict";

// Lincs Angular application
var app = angular.module("LincsApp", [
	"Main",  // main Angular module
	"Header",  // Header and navigation bar module
	"Footer",  // Footer module
	"Publications",  // LINCS publication controller
	"Centers",  // LINCS center controller
	"WikiIndex",  // index controller for all wiki entries
	"Wiki",  // wiki renderer
	"appRoutes",  // single page application routing
	"ngLocationUpdate",  // update location path without refresh
	"Docs"  // documentation page
]);

