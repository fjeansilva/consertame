'use stricts';

/**
 * Module dependencies
 *
 * - mongoose UserSchema model
 * - passport: middleware authentication mechanism
 */

 var User       = require('mongoose').model('User'),
     passport   = require('passport');


/**
 * Private method: Handler messages error
 * 
 * @param { Mongoose error object } err
 * @return { String } message
 */
 var getErrorMessage = function(err) {

    var message = '';

    if (err.code) {

      switch(err.code) {
        case 11000:
        case 11001:
          message = 'Username already exists';
          break;
        default:
          message = 'Something went wrong';
      }

    } else {
      for (var errName in err.errors) {
        if (err.errors[errName].message) message = err.errors[errName].message;
      }
    }

    return message;
 };


/**
 * Expose action create
 *
 * Create a new User, try save it. If catch an error, return the error in callback function
 * how param. If not, insert the user created in method json of response object.
 * 
 * @param { HTTP Request } req
 * @param { HTTP Response } res
 * @param { callback function } next
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
 *
 * @param { HTTP Request } req
 * @param { HTTP Response } res
 * @param { callback function } next
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
 * @param { HTTP Request } req
 * @param { HTTP Response } res
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
 * @param { HTTP Request } req
 * @param { HTTP Response } res
 * @param { callback function } next
 * @param { string } id
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
 * @param { HTTP Request } req
 * @param { HTTP Response } res
 * @param { callback function } next
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
 * @param { HTTP Request } req
 * @param { HTTP Response } res
 * @param { callback function } next
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





/**
 * Expose action renderSignin
 *
 * @param { HTTP Request } req
 * @param { HTTP Response } res
 * @param { callback function } next
 */

 exports.renderSignin = function(req, res, next) {

    if(!req.user) {
      res.render('signin', {
        title: 'Sign-in Form',
        messages: req.flash('error') || req.flash('info')
      });
    } else {
      return res.redirect('/');
    }

 };


/**
 * Expose action renderSignup
 *
 * @param { HTTP Request } req
 * @param { HTTP Response } res
 * @param { callback function } next
 */

 exports.renderSignup = function(req, res, next) {

    if(!req.user) {
      res.render('signup', {
        title: 'Sign-up Form',
        messages: req.flash('error')
      });
    } else {
      return res.redirect('/');
    }
    
 };


/**
 * Expose action signup
 *
 * @param { HTTP Request } req
 * @param { HTTP Response } res
 * @param { callback function } next
 */

 exports.signup = function(req, res, next) {

    if (!req.user) {
      var user = new User(req.body);
      var message = null;

      user.provider = 'local';

      user.save(function(err) {

        if (err) {
          var message = getErrorMessage(err);

          req.flash('error', message);
          return res.redirect('/signup');
        }

        req.login(user, function(err){

          if (err) return next(err);
          return res.redirect('/');
          
        });

      });
    } else {
      return res.redirect('/');
    }

 };

/**
 * Invalidate the authenticated session
 */

 exports.signout = function(req, res) {
    req.logout();
    res.redirect('/');
 };


/**
 *
 */

 exports.saveOAuthUserProfile = function(req, profile, done) {

    User.findOne({
      provider: profile.provider,
      providerId: profile.providerId
    }, function(err, user){

        if (err) {
          return done(err);
        } else {

          if (!user) {
            var possibleUserName = profile.username || ((profile.email) ? profile.email.split('@')[0] : '');

            User.findUniqueUsername(possibleUserName, null, function(availableUsername){

                profile.username = availableUsername;

                var splitName = profile.fullName.split(' ');
                profile.firstName = splitName[0] || '';
                profile.lastName = splitName[1] || '';

                user = new User(profile);

                user.save(function(err){

                  if (err) {
                    var message = _this.getErrorMessage(err);

                    req.flash('error', message);
                    return res.redirect('/signup');
                  }

                  return done(err, user);

                });
            });
          } else {
            return done(err, user);
          }
        }
    });
 };

   



























