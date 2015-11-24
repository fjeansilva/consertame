'use stricts';

/**
 * Module dependencies
 * 
 * - module config
 * - mongoose: Node.js ODM module
 */

 var config = require('./config'),
 	 mongoose = require('mongoose');

/**
 * Expose Mongoose db
 *
 * - connect mongoose
 * - registering models
 *
 * @return { instace mongoose }
 */

 module.exports = function() {

 	var db = mongoose.connect(config.db);

 	require('../app/models/user.server.model');

 	return db;

 };