'use stricts';

/**
 * Expose attributes of environment developer
 *
 * - db: url to connect mongodb
 * - sessionSecret: string for module session
 */

module.exports = {
	db: 'mongodb://localhost/biggaragedb',
	sessionSecret: 'developmentSesionSecret'
};