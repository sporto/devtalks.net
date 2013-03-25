var db = require('../../../db');
var getTagListService = require('../../../services/tags/get_list');

module.exports = {

	// list of tags
	// tags/
	index: function (req, res) {

		getTagListService.run(function (err, docs) {
			if (err) return res.send(404);
			return res.send(docs);
		});

	}

}