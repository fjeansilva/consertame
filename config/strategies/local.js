'use strict';

/**
 * Module dependencies
 *
 * - passport: middleware authenticate request
 * - passport-local: middleware to username/password authentication mechanism
 * - mongoose User: load UserSchema model
 */

 var passport 		= require('passport'),
 	 LocalStrategy 	= require('passport-local').Strategy,
 	 User 			= require('mongoose').model('User');


/**
 * Expose authentication
 *
 * try authenticate user, if cacth error, return callback function with the error.
 * if user not find, return callback function with message
 * if user not authenticate, return callback function with message
 */

 module.exports = function() {

 	passport.use(new LocalStrategy(function(username, password, done) {

 		User.findOne({
 			username: username
 		}, function(err, user){

 			if (err) {
 				return done(err);
 			}

 			if (!user) {
 				return done(null, false, {
 					message: 'Unknown user'
 				});
 			}

 			if (!user.authenticate(password)) {
 				return done(null, false, {
 					message: 'Invalid password'
 				});
 			}

 			return done (null, user);
 		});

 	}));

 };