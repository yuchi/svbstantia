
var Svbstance = require( './svbstance' );
var express = require( 'express' );

Svbstance.createApplication = function ( instance ) {
	var app = instance.app = express.createServer();
}

Svbstance.setupApplication = function ( instance ) {
	if ( !instance.app ) {
		Svbstance.createApplication( instance );
	}

	console.log( app );
}

