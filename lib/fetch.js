var request = require( './utils/request' );

module.exports = fetch;

/*
var qry = JSON.stringify({
	type: '/type/document',
	creator: '/user/substance'
});
*/

var callbackname = 'testing';

//var path = '/graph/read?callback='+callbackname+'&qry=' + encodeURIComponent(qry) + '&options=' + encodeURIComponent('{}');

//var test = "/graph/read?callback=jQuery16109015211265068501&qry=%7B%22type%22%3A%22%2Ftype%2Fdocument%22%2C%22creator%22%3A%22%2Fuser%2Fsubstance%22%7D&options=%7B%7D";

var path = [ 'http://substance.io/graph/read?callback=', callbackname, '&qry=', null, '&options=', null  ];

function fetch ( qry, options, callback ) {


	if ( !callback && typeof options === 'function' ) {
		callback = options;
		options = {};
	}

	path[ 3 ] = encodeURIComponent( JSON.stringify( qry ) );
	path[ 5 ] = encodeURIComponent( JSON.stringify( options ) );

	request( path.join(''), function ( error, res, body ) {
		var data,
			status = res.statusCode;

		if ( error ) {
			return callback( error, null, res );
		}

		if ( status !== 200 ) {
			return callback( status, null, res );
		}

		try {
			data = body.slice( callbackname.length + 1, body.length - 2 );
			data = JSON.parse( data );
		} catch ( e ) {
			return callback( e );
		}

		callback( null, data, res );
	});

}
