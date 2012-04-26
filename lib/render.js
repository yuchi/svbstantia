
var Svbstance = require( './svbstance' );
var express = require( 'express' );
var _ = require( 'underscore' );

_.extend( Svbstance.prototype, {

	renderIndex: function ( req, res, next ) {
		res.render( 'index' );
	},

	renderDocument: function ( req, res, next ) {

		var name = req.params.name;

		var that = this;
		this.load( name, function () {

			var document = that.graph.find({
				type: '/type/document',
				name: name
			}).first();

			if ( !document ) {
				next();
			} else {
				res.locals.document = document.toJSON();
				res.render( 'single' );			
			}

		});
	}

});
