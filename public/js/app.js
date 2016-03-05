"use strict";

// Lincs Angular application
var app = angular.module("LincsApp", [
	"Main",  // main Angular module
	"Landing",  // home/front/landing page module
	"Header",  // Header and navigation bar module
	"Footer",  // Footer module
	"Publications",  // LINCS publication controller
	"Centers",  // LINCS center controller
	"DocsIndex",  // index controller for all wiki entries
	"Docs",  // documentation renderer
	"News",  // handles article metadata
	"Reader",
	"Auth",  // authenti
	"appRoutes",  // single page application routing
	"ngLocationUpdate",  // update location path without refresh
	"ngtweet",
	// "angular-clipboard",
	"LincsDirectAccessTools",
	"Concierge",
	// "ngFlash",  // flash messages
	"Docs"  // documentation page
]);

