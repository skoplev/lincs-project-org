"use strict";

// Lincs Angular application
var app = angular.module("LincsApp", [
	"Main",  // main Angular module
	"Header",  // Header and navigation bar module
	"Footer",  // Footer module
	"Publications",  // LINCS publication controller
	"Centers",  // LINCS center controller
	"DocsIndex",  // index controller for all wiki entries
	"Docs",  // documentation renderer
	"appRoutes",  // single page application routing
	"ngLocationUpdate",  // update location path without refresh
	"LincsDirectAccessTools",
	"Docs"  // documentation page
]);

