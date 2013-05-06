var authServ =                require('../../../../services/authorisations/authorise');
var destroyService =          require('../../../../services/videos/destroy');

function main(req, res) {
	return authServ.run(req, res, 'video', 'update', process);
}

function process(err, res, res) {
	var id = req.params.suggestion;
	destroyService.run(id, function (err, doc) {
		if (err) return res.send(500);
		res.send(doc);
	});
}

module.exports = main;