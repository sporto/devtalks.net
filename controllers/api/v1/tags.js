var Video		= require('../../../models/video');
var Tags		= require('../../../collections/tags');

module.exports = {

	index: function (req, res) {

		function done(err, docs) {
			if (err) return res.send(404);
			return res.send(docs);
		}

		Tags.weights(done);
	},

	videos: function (req, res) {
		var id = req.params.tag;

		function done(err, docs) {
			// console.log(docs);
			if (err) return res.send(505);
			return res.send(docs);
		}

		if (id === 'all') {
			Video.find({'approved': true}).exec(done);
		} else {
			Video.find({'tags': id, 'approved': true}).exec(done);
		}
	},

	search: function (req, res) {
		var query = req.query;
		var tags = query.tags || [];

		function done(err, docs) {
			if (err) return res.send(505);
			return res.send(docs);
		}

		var q = {'approved': true, 'tags': {$in: tags}};
		Video.find(q).exec(done);
	}

}