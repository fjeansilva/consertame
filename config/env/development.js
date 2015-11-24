'use stricts';

/**
 * Expose attributes of environment developer
 *
 * - db: url to connect mongodb
 * - sessionSecret: string for module session
 * - credential facebook developer
 */

module.exports = {
	db: 'mongodb://localhost/biggaragedb',
	sessionSecret: 'developmentSesionSecret',
	facebook: {
		clientID: '531801306974830',
		clientSecret: '695e37979ab138bf9f58ce445584d3a9',
		callbackURL: 'http://localhost:3000/oauth/facebook/callback'
	}
};