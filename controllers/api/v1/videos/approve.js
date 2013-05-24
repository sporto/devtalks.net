var authServ            = require('../../../../services/authorisations/authorise');
var approveService      = require('../../../../services/videos/approve');

function main(req, res) {
	return authServ.run(req, res, 'video', 'manage', process);
}

function process(err, req, res) {
	var id = req.params.video;
	approveService.run(id, function (err, doc) {
		if (err) return res.send(500);
		res.send(doc);
	});
}

module.exports = main;