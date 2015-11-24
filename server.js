'use stricts';

/**
 * Module dependencies
 *
 * - config environment var NODE_ENV
 * - config mongoose 
 * - config express
 * - config passport
 */

process.env.NODE_ENV = process.env.NODE_ENV || 'development'; 

var mongoose 	= require('./config/mongoose'),
	express 	= require('./config/express'),
	passport	= require('./config/passport');

/**
 * Start Module
 *
 * - get instance mongoose db
 * - get instance express app
 * - get instance passport app
 * - set port 3000 listen
 * - expose module app
 */

var db 			= mongoose();	
var app 		= express();
var passport 	= passport();

app.listen(3000);

module.exports = app;

console.log("LET'S RUNNNNNNNN :)");
