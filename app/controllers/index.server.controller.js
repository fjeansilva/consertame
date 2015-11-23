/**
 * Expose function render
 *
 * @param { HTTP request } req
 * @param { HTTP response } res
 */

exports.render = function(req, res) {

	var visit = null;

	if (!req.session.lastVisit) {
		req.session.lastVisit = new Date();	
	} 

	visit = req.session.lastVisit;


	res.render('index', {
		title: "Bem vindo ao Conserta.me :D" + visit
	});
};