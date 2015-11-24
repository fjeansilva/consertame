'use stricts';

/**
 * Module dependencies
 *
 * - config environment var NODE_ENV
 * - config mongoose 
 * - config express
 */

process.env.NODE_ENV = process.env.NODE_ENV || 'development'; 

var mongoose 	= require('./config/mongoose'),
	express 	= require('./config/express');

/**
 * Start Module
 *
 * - get instance mongoose db
 * - get instance express app
 * - set port 3000 listen
 * - expose module app
 */
var db 		= mongoose();	
var app 	= express();

app.listen(3000);

module.exports = app;

console.log('Server running at port 3000');
