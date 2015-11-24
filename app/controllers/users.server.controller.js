'use stricts';

/**
 * Module dependencies
 */

 var User = require('mongoose').model('User');

 /**
  * Expose action create
  *
  * Create a new User, try save it. If catch an error, return the error in callback function
  * how param. If not, insert the user created in method json of response object.
  * 
  * @param { HTTP Request }
  * @param { HTTP Response }
  * @param { callback function }
  */

 exports.create = function(req, res, next) {

 	var user = new User(req.body);

 	user.save(function(err){

 		if (err) {
 			return next(err);
 		} else {
 			res.json(user);
 		}

 	});

 };

/**
 * Expose action list
 *
 * find all users. If catch an error, return the error in callback function. If not insert users
 * in method json of response object.
 */

exports.list = function(req, res, next) {

	User.find({}, function(err, users) {

		if (err) {
			return next(err);
		} else {
			res.json(users);
		}

	});

};


/**
 * Expose action read
 *
 * @param { HTTP Request }
 * @param { HTTP Response }
 */

 exports.read = function(req, res) {
 	res.json(req.user);
 };

/**
 * Expose action userByID
 *
 * Try find the user, if catch an error, return error in callback function, if not set user in
 * req.user
 *
 * @param { HTTP Request }
 * @param { HTTP Response }
 * @param { callback function }
 * @param { string }
 */

 exports.userByID = function(req, res, next, id) {

 	User.findOne({
 		_id: id
 	}, function(err, user) {

 		if (err) { 
 			return next(err); 
 		} else {
 			req.user = user;
 			next();
 		}

 	});

 };


 /**
  * Expose action update
  *
  * Try update user. If catch an error, return the error in callback function. If not insert users
  * in method json of response object.
  *
  * @param { HTTP Request }
  * @param { HTTP Response }
  * @param { callback function }
  */

  exports.update = function (req, res, next) {

  	User.findByIdAndUpdate(req.user.id, req.body, function(err, user){

  		if (err) {
  			console.log(err);
  			return next(err);
  		} else {
  			res.json(user);
  		}

  	});

  };


 /**
  * Expose action delete
  *
  * Try delete user. If catch an error, return the error in callback function. If not insert users
  * in method json of response object.
  *
  * @param { HTTP Request }
  * @param { HTTP Response }
  * @param { callback function }
  */

  exports.delete = function (req, res, next) {

  	req.user.remove(function(err){

  		if (err) {
  			console.log(err);
  			return next(err);
  		} else {
  			res.json(req.user);
  		}

  	});

  };