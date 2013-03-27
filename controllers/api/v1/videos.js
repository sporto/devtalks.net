var _ = require('underscore');
var findService = require('../../../services/videos/find_by_tags');
var markAsSeenService = require('../../../services/videos/mark_seen');

module.exports = {

	search: function (req, res) {
		var query = req.query;
		var tags = query.tags || [];

		// tags should always be an array
		if (!_.isArray(tags)) {
			tags = [tags];
		}

		findService.run(tags, function (err, docs) {
			if (err) return res.send(505);
			return res.send(docs);
		});
	},

	mark_seen: function (req, res) {
		if (req.user) {
			var videoId = req.params.video;
			var userId = req.user._id;

			markAsSeenService.run(videoId, userId, function (err) {
				if (err) return res.send(400);
				res.send(200);
			});

		} else {
			res.send(400);
		}
	}

}