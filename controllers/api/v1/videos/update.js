var authServ =                require('../../../../services/authorisations/authorise');

function main(req, res) {
	return authServ.run(req, res, 'video', 'update', process);
}

function process(err, req, res) {
	saveService.run(req.body, function (err, doc) {
		if (err) return res.send(500);
		return res.send(doc, 200);
	});
}

module.exports = main;