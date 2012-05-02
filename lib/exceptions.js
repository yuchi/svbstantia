
var Svbstance = require( './svbstance' );
var _ = require( 'underscore' );

Svbstance.errors = Object.create( null );

module.exports = Svbstance.errors;

Svbstance.errors.NotFound = NotFound;

function NotFound ( msg ) {
	this.name = 'NotFound';
	this.statusCode = 404;
	Error.call( this, msg );
	Error.captureStackTrace( this, arguments.callee );
}

var errorName;

for ( errorName in Svbstance.errors ) {
	(function ( errorName, error ) {

		error.create = function ( msg ) {
			return new error( msg );
		};

	})( errorName, Svbstance.errors[ errorName ] );
}