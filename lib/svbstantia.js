
var path = require( 'path' );
var _ = require( 'underscore' );
var Data = require( 'data' );
var schema = require( './utils/substance-schema' );

module.exports = Svbstantia;

function Svbstantia () {
	Svbstantia.prototype.initialize.apply( this, arguments );
}


// Imports
// =======

require( './logs' );
require( './exceptions' );
require( './application' );
require( './cache' );
require( './render' );


// Statics
// =======

var fetch = Svbstantia.fetch = require( './fetch' );

Svbstantia.create = function ( config, callback ) {
	var instance = new Svbstantia( config );
	instance.loadIndex( callback );
	return instance;
};

Svbstantia.setupConfig = function ( instance ) {

	var config = instance.config,
		additional = {
			sourceURL: 'http://substance.io/' + config.username
		};

	_.defaults( additional );

	return instance;
}


// Methods
// =======

_.extend( Svbstantia.prototype, {

	defaults: {
		name: 'Svbstantia',
		username: 'substance',
		app: {
			assets: path.resolve( __dirname, '..', 'assets' ),
			views: path.resolve( __dirname, '..', 'views' ),
			setup: true,
			base: '/',
			port: 3000
		}
	},

	initialize: function ( config ) {
		config || ( config = {} );
		config.app || ( config.app = {} );

		this.graph = new Data.Graph( schema );
		this.cache = new Svbstantia.Cache();

		config.app = _.extend( this.defaults.app, config.app );
		this.config = _.extend( this.defaults, config );

		Svbstantia.setupConfig( this );

		if ( this.config.app.setup ) {
			Svbstantia.setupApplication( this );
		}
	},

	fetch: function ( query, callback ) {
		var that = this;
		Svbstantia.fetch( query, function ( error, data) {
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

	load: function ( name, callback ) {

		var that = this;

		var document = that.graph.find({
			type: '/type/document',
			name: name
		}).first();

		if ( !document ) {
			callback( Svbstantia.errors.NotFound.create( "Article not listed" ) );
		} else {
			this.cache.get( name, callback, function () {

				Svbstantia.info( 'Loading article "%s"', name );

				var query = that.getQuery({
					name: name,
					children: {
						_recursive: true
					}
				});

				that.fetch( query, callback );
			});
		}

		return this;
	},

	loadIndex: function ( callback ) {
		var query = this.getQuery();
		return this.fetch( query, callback);
	},

	getQuery: function ( query ) {
		query || ( query = {} );
		query = _.defaults( query, {
			type: '/type/document',
			creator: '/user/' + this.config.username
		});
		return query;
	},

	getIndex: function () {
		return this.graph.find({  type: '/type/document' });
	}

});

/*
function line ( chara, cnt ) {
	cnt = cnt.length || cnt;
	return (new Array( cnt + 1 )).join( chara );
}
*/
