var _ = require( 'underscore' );
var Data = require( 'data' );
var schema = require( './utils/substance-schema' );

module.exports = Svbstance;

function Svbstance () {
	this.initialize.apply( this, arguments );
}

require( './application' );


// Statics
// =======

var fetch = Svbstance.fetch = require( './fetch' );

Svbstance.create = function ( config, callback ) {
	var instance = new Svbstance( config );
	instance.loadIndex( callback );
	return instance;
};


// Methods
// =======

_.extend( Svbstance.prototype, {

	defaults: {
		username: 'substance'
	},

	initialize: function ( config ) {
		config || ( config = {} );
		this.graph = new Data.Graph( schema );
		this.config = _.extend( this.defaults, config );

		Svbstance.setupApplication( this );
	},

	fetch: function ( query, callback ) {
		var that = this;
		Svbstance.fetch( query, function ( error, data) {
			// TODO manage errors			
			if ( data ) {
				that.merge( data );
			}
			callback( error, data );
		});
		return this;
	},

	merge: function ( graph ) {
		this.graph.merge( graph );
		return this;
	},

	load: function ( query, callback ) {
		// Some good cache here
		query = this.getQuery( query );
		return this.fetch( query, callback );
	},

	loadIndex: function ( callback ) {
		var query = this.getQuery();
		return this.fetch( query, callback );
	},

	getQuery: function ( query ) {
		query || ( query = {} );
		query = _.defaults( query, {
			'type': '/type/document',
			'creator': '/user/' + this.config.username
		});
		return query;
	}

});

/*
function line ( chara, cnt ) {
	cnt = cnt.length || cnt;
	return (new Array( cnt + 1 )).join( chara );
}
*/

/*
fetch({

	type: '/type/document',
	creator: '/user/'+username,
	children: { _recursive: true }

}, function ( error, data ) {
	//console.log( graph );

	graph.merge( data );

	graph.find({ type: '/type/document' }).each(function (doc) {
		var title = (doc.get( 'title' ) || '').trim();
		var lead = (doc.get( 'lead' ) || '').trim();
		console.log( title );
		console.log( line( '=', title ) );
		if (lead) {
			console.log( lead );
			console.log( line( '-', lead ) );
		}
		console.log( doc.get('name') );
		console.log( '' );
	});

});
*/

