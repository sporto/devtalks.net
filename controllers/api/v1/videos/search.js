var _ =                       require('underscore');
var findService =             require('../../../../services/videos/find_by_tags');

function main(req, res) {
	var query = req.query;
	var tags = query.tags || [];

	// tags should always be an array
	if (!_.isArray(tags)) {
		tags = [tags];
	}

	findService.run(tags, function (err, docs) {
		if (err) return res.send(404); // not found
		return res.send(docs);
	});
}

module.exports = main;