
var Svbstantia = require( './svbstantia' );
var _ = require( 'underscore' );

Svbstantia.errors = Object.create( null );

module.exports = Svbstantia.errors;

Svbstantia.errors.NotFound = NotFound;

function NotFound ( msg ) {
	this.name = 'NotFound';
	this.statusCode = 404;
	Error.call( this, msg );
	Error.captureStackTrace( this, arguments.callee );
}

var errorName;

for ( errorName in Svbstantia.errors ) {
	(function ( errorName, error ) {

		error.create = function ( msg ) {
			return new error( msg );
		};

	})( errorName, Svbstantia.errors[ errorName ] );
}