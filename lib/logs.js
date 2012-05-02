
var Svbstance = require( './svbstance' );
var _ = require( 'underscore' );

var levels = "debug info warn error grave".split(' ').reverse();

var logs = Object.create( null );

module.exports = logs;

for ( var i = 0, l = levels.length; i < l; ++i ) {
	( function ( level ) {

		var _slice = Array.prototype.slice,
			label = levels[ level ];

		logs[ label ] = function () {
			var args = _slice.call( arguments );

			if ( typeof args[ 0 ] === "string" ) {
				args[ 0 ] = label + ': ' + args[ 0 ];
			} else {
				args.unshift( label + ': ' );
			}

			if ( Svbstance.level == null || Svbstance.level >= level ) {
				console.log.apply( console, args );
			}
		};

	})( i )
}

_.extend( Svbstance, logs );
