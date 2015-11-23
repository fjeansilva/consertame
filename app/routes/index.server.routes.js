/**
 * Expose index route
 *
 * @param { express application } app
 */

module.exports = function(app) {

	var index = require('../../app/controllers/index.server.controller');
	app.get('/', index.render);

};