'use strict';

/**
 *	Module dependencies
 *
 * 	- config: module load environment variable NODE_ENV
 *  - express: web framework
 *  - morgan: logger middleware
 *  - compression: compression middleware to response data
 * 	- body-parser: body-parsing middleware used to parser the request body
 * 	- method-override: middleware that provides HTTP PUT or DELETE verb
 * 	- express-session: middleware to keep track of user
 */

var config 			= require('./config'),
	express 		= require('express'),
	morgan 			= require('morgan'),
	compression 	= require('compression'),
	bodyParser 		= require('body-parser'),
	methodOverride 	= require('method-override'),
	session			= require('express-session');


/**
 * Create an express application
 * 
 * - Call express function and send to app var
 * - Config the modules
 * - Set view engine
 * - Register an index route in app
 *
 * @return { express application }
 */

module.exports = function() {

	var app = express();

	if (process.env.NODE_ENV === 'development') {
		app.use(morgan('combined'));
	} else if (process.env.NODE_ENV === 'production') {
		app.use(compression());
	}

	app.use(bodyParser.urlencoded({
		extended: true
	}));

	app.use(bodyParser.json());
	app.use(methodOverride());

	app.use(session({
		saveUninitialized: true,
		resave: true,
		secret: config.sessionSecret
	}));

	app.use(express.static('./public'));

	app.set('views', './app/views');
	app.set('view engine', 'ejs')

	require('./../app/routes/index.server.routes')(app);

	return app;

};