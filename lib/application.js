
var Svbstance = require( './svbstance' );
var express = require( 'express' );
var _ = require( 'underscore' );

Svbstance.createApplication = function ( instance ) {
	var app = instance.app = express();
}

var line = Svbstance.drawLine = function ( chara, cnt ) {
	cnt = cnt.length || cnt;
	++cnt;
	cnt = parseInt( cnt / chara.length );
	return ( new Array( cnt ) ).join( chara );
}

Svbstance.setupApplication = function ( instance ) {
	if ( !instance.app ) {
		Svbstance.createApplication( instance );
	}

	var app = instance.app;

	app.set( 'view engine', 'jade');
	app.set( 'view options', {
		layout: false
	});

	app.get( '/:name', _.bind( instance.renderDocument, instance ) );

	app.get( '/', _.bind( instance.renderIndex, instance ) );

	app.locals.use( function ( req, res, done ) {
		
		res.locals.documents = instance.getIndex();
		done();

	});

	app.listen( instance.config.app.port );
}

