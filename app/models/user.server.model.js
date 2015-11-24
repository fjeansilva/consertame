'use stricts';

/**
 * Module dependencies
 *
 * - mongoose: Node.js ODM module
 * - crypto: module that encapsulating secure credentials
 */

 var mongoose	= require('mongoose'),
 	 crypto		= require('crypto'),
 	 Schema		= mongoose.Schema;


/**
 * Schema User Model
 */

 var UserSchema = new Schema({

 	firstName: String,
 	lastName: String,
 	email: {
 		type: String,
 		match: [/.+\@.+\..+/, "Please fill a valid email address"]
 	},
 	username: {
 		type: String,
 		unique: true,
 		required: 'Username is required',
 		trim: true
 	},
 	password: {
 		type: String,
 		validate: [
 			function(password) {
 				return password && password.length > 6;
 			}, 'Password should be longer'
 		]
 	},
 	salt: {
 		type: String
 	},
 	provider: {
 		type: String,
 		required: 'Provider is required'
 	},
 	providerId: String,
 	providerData: {},
 	created: {
 		type: Date,
 		default: Date.now
 	}

 });


/**
 * Get/Set fullname user
 *
 * @param { String } fullname
 */

UserSchema.virtual('fullName').get(function(){
	return this.firstName + ' ' + this.lastName;
}).set(function(fullName) {
	var splitName = fullName.split(' ');
	this.firstName = splitName[0] || '';
	this.lastName = splitName[1] || '';
});


/**
 * Handle the hashing of users
 */

UserSchema.pre('save', function(next){

	if(this.password) {
		this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
		this.password = this.hashPassword(this.password);
	}

	next();
});


/**
 * Return hash password string
 *
 * @param { String } password
 */

UserSchema.methods.hashPassword = function(password) {
	return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
};


/**
 * Return true if password is equal
 *
 * @param { String } password
 */

 UserSchema.methods.authenticate = function(password) {
 	return this.password === this.hashPassword(password);
 };


/**
 * Find an available unique username for new users
 *
 * @param { String } username
 * @param { String } suffix
 * @param { callback function } callback
 */

 UserSchema.statics.findUniqueUsername = function(username, suffix, callback) {

 	var _this = this;
 	var possibleUserName = username + (suffix || '');

 	_this.findOne({
 			username: possibleUserName
 		}, function(err, user){
 		 if (!err) {
 		 	if (!user) {
 		 		callback(possibleUserName);
 		 	} else {
 		 		return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
 		 	}
 		 } else {
 		 	callback(null);
 		 }
 	});

 };


 UserSchema.set('toJSON', { getters: true, virtuals: true });
 mongoose.model('User', UserSchema);