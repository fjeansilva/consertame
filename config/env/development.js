'use stricts';

/**
 * Expose attributes of environment developer
 *
 * - db: url to connect mongodb
 * - sessionSecret: string for module session
 * - credential facebook developer
 */

module.exports = {
	db: process.env.DB,
	sessionSecret: process.env.SESSIONSECRET,
	facebook: {
		clientID: process.env.CLIENTID,
		clientSecret: process.env.CLIENTSECRET,
		callbackURL: process.env.CALLBACKURL
	}
};