var Video		= require('../../../models/video');
var Tags		= require('../../../collections/tags');

module.exports = {

	// list of tags
	// tags/
	index: function (req, res) {

		function done(err, docs) {
			if (err) return res.send(404);
			return res.send(docs);
		}

		Tags.weights(done);
	},

	// find videos for a given tag
	// tags/:tag/videos
	videos: function (req, res) {
		var id = req.params.tag;

		function done(err, docs) {
			if (err) return res.send(505);
			return res.send(docs);
		}

		if (id === 'all') {
			Video.find({'approved': true}).exec(done);
		} else {
			Video.find({'tags': id, 'approved': true}).exec(done);
		}
	}

}