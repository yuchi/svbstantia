
var Svbstantia = require( './svbstantia' );
var express = require( 'express' );
var _ = require( 'underscore' );
var moment = require( 'moment' );

var DESC_BY_UPDATED_AT = function(item1, item2) {
	var v1 = item1.updated_at.unix(),
		v2 = item2.updated_at.unix();
	return v1 === v2 ? 0 : (v1 > v2 ? -1 : 1);
};

var DESC_BY_PUBLISHED_AT = function(item1, item2) {
	var v1 = ( item1.published_at || item1.updated_at ).unix(),
		v2 = ( item2.published_at || item2.updated_at ).unix();
	return v1 === v2 ? 0 : (v1 > v2 ? -1 : 1);
};


_.extend( Svbstantia.prototype, {

	reindexer: function ( req, res, next ) {
		res.redirect( '/' );
		this.reindex();
	},

	renderRSS: function ( req, res, next ) {
		res.contentType('application/rss+xml');
		res.render( 'rss' );
	},

	renderIndex: function ( req, res, next ) {
		res.render( 'index' );
	},

	renderError: function ( err, req, res, next ) {
		res.locals.error = err;
		res.statusCode = err.statusCode || 500;
		res.render( 'error' );
	},

	renderDocument: function ( req, res, next ) {

		var name = req.params.name,
			that = this;

		this.load( name, function ( err ) {

			var document;

			if ( !err ) {
				document = that.graph.find({
					type: '/type/document',
					name: name
				}).first();

				if ( !document ) {
					err = Svbstantia.errors.NotFound.create( "Article not found" );
				}
			}

			if ( err ) {
				Svbstantia.debug( "Article '%s' not found", name );
				throw err;
				//next( err );
			} else {
				res.locals.document = that.prepareDocument( document );
				res.locals.content = that.renderDocumentContent( document );
				res.locals.mode = 'single';
				res.render( 'single' );
			}

		});
	},

	renderDocumentContent: function ( doc ) {
		var renderer = new HTMLRender( doc );
		return renderer.render();
	},

	getRenderableIndex: function () {
		var index = this.getIndex(),
			objects = [],
			that = this;

		index.each( function ( doc ) {
			objects.push( that.prepareDocument( doc ) );
		});

		return objects.sort( DESC_BY_PUBLISHED_AT );
	},

	prepareDocument: (function () {
		var dates = "created_at published_at updated_at".split( " " ),
			l = dates.length;

		return function ( document ) {
			var i, dateable,
				json = document.toJSON();
			for ( i = 0; i < l; ++i ) {
				dateable = dates[ i ];
				json[ dateable ] = json[ dateable ] && moment( json[ dateable ] );
			}
			json.substance_url = 'http://substance.io/'+this.config.username+'/'+json.name;
			return json;
		}
	})()

});

// Stolen from https://github.com/substance/reader

HTMLRender.renderNode = function ( el ) {
	var i, type;
	for ( i = 0; i < el.types.length; ++i ) {
		type = el.types[ i ];
		if ( HTMLRender.renderers[ type ] ) {
			return HTMLRender.renderers[ type ]( el );
		}
	}
	return '';
}

// Implemented node types

HTMLRender.renderers = {

	"/type/document": function(node) {
		var content = [ '<div class="sec">' ];

		node.get( 'children' ).forEach(function ( child ) {
			content.push( HTMLRender.renderNode( child ) );
		});

		content.push( '</div>' );

		return content.join( '' );
	},

	"/type/article": function(node) {
		return HTMLRender.renderers["/type/document"](node);
	},

	"/type/manual": function(node) {
		return HTMLRender.renderers["/type/document"](node);
	},

	"/type/section": function(node) {
		var content = [ '<section><h1>', node.get('name'), '</h1><div class="sec">' ];

		node.get('children').forEach(function(child) {
			content.push( HTMLRender.renderNode(child) );
		});

		content.push( '</div></section>' );
		return content.join( '' );
	},

	"/type/text": function(node) {
		return node.get('content');
	},

	"/type/question": function(node) {
		return '<p class="question">'+node.get('content')+'</p>';
	},

	"/type/answer": function(node) {
		return '<p class="answer">'+node.get('content')+'</p>';
	},

	"/type/quote": function(node) {
		return "<quote>"+node.get('content')+"</quote>";
	},

	"/type/code": function(node) {
		return '<pre class="code"><code>'+node.get('content')+'</code></pre>';
	},

	"/type/image": function(node) {
		return '<image src="'+node.get('url')+'"/>';
	},
	"/type/resource": function(node) {
		return '<image src="'+node.get('url')+'"/>';
	}

};


function HTMLRender (root) {
	return {
		render: function() {
			// Traverse the document
			return HTMLRender.renderNode( root );
		}
	};
};
