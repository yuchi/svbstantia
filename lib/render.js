
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
				res.locals.content = that.prepareDocument( document );
				res.render( 'single' );
			}

		});
	},

	prepareDocument: function ( doc ) {
		var renderer = new HTMLRender( doc );
		return renderer.render();
	}

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
		var content = [];

		node.get( 'children' ).forEach(function ( child ) {
			content.push( HTMLRender.renderNode( child ) );
		});

		return content.join( '' );
	},

	"/type/article": function(node) {
		return HTMLRender.renderers["/type/document"](node);
	},

	"/type/manual": function(node) {
		return HTMLRender.renderers["/type/document"](node);
	},

	"/type/section": function(node) {
		var content = [ '<section><h1>', node.get('name'), '</h2>' ];

		node.get('children').forEach(function(child) {
			content.push( HTMLRender.renderNode(child) );
		});

		content.push( '</section>' );

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
