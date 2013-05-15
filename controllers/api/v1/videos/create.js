var logger =               require('../../../../logger');
var createService =        require('../../../../services/videos/create');

function create(req, res) {
	var data = req.body;
	logger.info(data);
	//console.log(data)
	createService.run(data, function (err, doc) {
		if (err) return res.send(500, err.message);
		return res.send(200, doc);
	});
}

module.exports = create;