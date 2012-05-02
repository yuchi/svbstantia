
var Svbstance = require( './svbstance' );
var _ = require( 'underscore' );

Svbstance.Cache = Cache;
module.exports = Cache;

function Cache () {
	Cache.prototype.initialize.apply( this, arguments );
}


// Statics
// =======

Cache.getKey = _.memoize(function ( key ) {
	return '{{' + key + '}}';
});

Cache.now = function () {
	return (new Date()).getTime();
};


// Methods
// =======

_.extend( Cache.prototype, {

	initialize: function ( config ) {
		this.config = config || {};

		this.store = {};
		this.timeout = this.config.timeout || 60e3;
	},

	set: function ( key ) {
		key = Cache.getKey( key );
		this.store[ key ] = Cache.now();
		return this;
	},

	get: function ( key, present, absent ) {

		var _key = Cache.getKey( key ),
			time = this.store[ _key ],
			now = Cache.now();

		if ( time == null || ( now - time ) > this.timeout ) {
			this.set( key );
			_.defer( absent );
		} else {
			_.defer( present );
		}
	}

});
