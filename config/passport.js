'use strict';

/**
 * Module dependencies
 *
 * - passport: middleware authentication mechanism
 * - mongoose: Node.js ODM module
 */

 var passport = require('passport'),
 	 mongoose = require('mongoose');


/**
 * Expose module
 *
 * Methods are used to define how Passport will handle user serialization.
 * Configuration file strategy
 */

 module.exports = function() {

 	var User = mongoose.model('User');

 	passport.serializeUser(function(user, done) {
 		done(null, user.id);
 	});

 	passport.deserializeUser(function(id, done){

 		User.findOne({
 			_id: id
 		}, '-password -salt', function(err, user){
 			done(err, user);
 		})
 	});

 	require('./strategies/local.js')();
 	require('./strategies/facebook.js')();

 };