var authServ        = require('../../../../services/authorisations/authorise');
var destroyService  = require('../../../../services/videos/destroy');
var logger          = require('../../../../logger');

function main(req, res) {
	logger.info('destroy');
	return authServ.run(req, res, 'video', 'manage', process);
}

function process(err, req, res) {
	logger.info('api/v1/videos/destroy');
	// logger.info(req.body);
	// logger.info(req.params);

	var id = req.params.video;
	logger.info('id = ' + id);

	destroyService.run(id, function (err, doc) {
		if (err) return res.send(500);
		res.send(doc);
	});
}

module.exports = main;