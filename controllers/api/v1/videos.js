var Video		= require('../../../models/video');
var _ = require('underscore');

module.exports = {

	search: function (req, res) {
		var query = req.query;
		var tags = query.tags || [];

		// tags should always be an array
		if (!_.isArray(tags)) {
			tags = [tags];
		}

		function done(err, docs) {
			if (err) return res.send(505);
			return res.send(docs);
		}

		var q = {'approved': true, 'tags': {$in: tags}};
		Video.find(q).exec(done);
	}

}