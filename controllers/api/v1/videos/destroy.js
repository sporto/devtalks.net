var authServ        = require('../../../../services/authorisations/authorise');
var destroyService  = require('../../../../services/videos/destroy');
var logger          = require('../../../../logger');

function main(req, res) {
	logger.info('destroy');
	return authServ.run(req, res, 'video', 'manage', process);
}

function process(err, req, res) {
	var id = req.params.suggestion;
	destroyService.run(id, function (err, doc) {
		if (err) return res.send(500);
		res.send(doc);
	});
}

module.exports = main;