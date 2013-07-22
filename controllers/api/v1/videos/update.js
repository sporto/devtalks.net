var authServ = require('../../../../services/authorisations/authorise');
var saveServ = require('../../../../services/videos/save');

function main(req, res) {
	return authServ.run(req, res, 'video', 'manage', process);
}

function process(err, req, res) {
	saveServ.run(req.body, function (err, doc) {
		if (err) return res.send(500);
		return res.send(doc, 200);
	});
}

module.exports = main;