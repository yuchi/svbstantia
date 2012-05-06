
var Svbstantia = require( './svbstantia' );
var express = require( 'express' );
var assets = require( 'connect-assets' );
var _ = require( 'underscore' );

Svbstantia.createApplication = function ( instance ) {
	var app = instance.app = express();
}

var line = Svbstantia.drawLine = function ( chara, cnt ) {
	cnt = cnt.length || cnt;
	++cnt;
	cnt = parseInt( cnt / chara.length );
	return ( new Array( cnt ) ).join( chara );
}

Svbstantia.setupApplication = function ( instance ) {
	if ( !instance.app ) {
		Svbstantia.createApplication( instance );
	}

	var app = instance.app;

	app.use( assets({
		src: instance.config.app.assets
	}));

	app.set( 'views', instance.config.app.views );
	app.set( 'view engine', 'jade');
	app.set( 'view options', {
		layout: false
	});

	app.use( app.router );

	app.use( function () {
		console.log( arguments );
	});

	app.use( function ( err, req, res, next ) {
		if ( err.statusCode ) {
			instance.renderError( err, req, res, next );
		} else {
			next( err );
		}
	});

	//app.get( '/error/:error', _.bind( instance.renderError, instance ) );

	app.get( '/:name', _.bind( instance.renderDocument, instance ) );

	app.get( '/', _.bind( instance.renderIndex, instance ) );

	app.locals.use( function ( req, res, done ) {

		if ( res.locals.mode == null ) {
			res.locals.mode = 'index';
		}
		res.locals.config = instance.config;
		res.locals.documents = instance.getRenderableIndex();
		res.locals.title = instance.config.name;
		done();

	});

	app.listen( instance.config.app.port );
}

