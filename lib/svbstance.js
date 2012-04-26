var Data = require( 'data' );
var schema = require( './utils/substance-schema.js' );

module.exports = Svbstance;

var fetch = Svbstance.fetch = require( './fetch' );
var graph = Svbstance.Graph = new Data.Graph( schema );

var username = 'substance';
Svbstance.setUsername = function ( _username ) {
	username = _username;
};

function line ( chara, cnt ) {
	cnt = cnt.length || cnt;
	return (new Array( cnt + 1 )).join( chara );
}

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

function Svbstance () {}
