'use stricts';
/**
 * Module dependencies
 *
 * - mongoose: Node.js ODM module
 */

 var mongoose	= require('mongoose'),
 	 Schema		= mongoose.Schema;

/**
 * Schema User Model
 */

 var UserSchema = new Schema({

 	firstName: String,
 	lastName: String,
 	email: String,
 	username: String,
 	password: String

 });

 mongoose.model('User', UserSchema);
