var request = require('request');

module.exports = requestUtil;

var proxy;

requestUtil.getEnvironmentProxy = function () {
	var env = process.env;
	return env.http_proxy || env.HTTP_PROXY || env[ 'http-proxy' ] || null;
};

requestUtil.setProxy = function ( _proxy ) {
	proxy = _proxy;
}

proxy = requestUtil.getEnvironmentProxy();

function requestUtil ( o, cb ) {
	if ( typeof o === 'string' ) {
		o = { url: o };
	}

	if ( o.proxy == null && proxy ) {
		o.proxy = proxy;
	}

	return request( o, cb );
}

