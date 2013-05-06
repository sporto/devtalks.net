var findLatestServ =          require('../../../../services/videos/find_latest');

function main(req, res) {
	findLatestServ.run(function (err, docs) {
		if (err) return res.send(404); // not found
		return res.send(docs);
	});
}

module.exports = main;