var Tags = require('../../../models/tags');

module.exports = {

	index: function (req, res) {

		function done(err, docs) {
			if (err) return res.send(404);
			return res.send(docs);
		}

		Tags.all(done);
	}

}