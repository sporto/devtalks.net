var _ =                  require('underscore');
var findService =        require('../../../services/videos/find_by_tags');
var findLatestServ =     require('../../../services/videos/find_latest');
var markAsSeenService =  require('../../../services/videos/mark_seen');
var saveService =        require('../../../services/videos/save');

module.exports = {

	
	update: function (req, res) {
		// TODO check permission
		// console.log('UPDATE');
		// console.log(req.body)
		saveService.run(req.body, function (err, doc) {
			if (err) return res.send(400);
			return res.send(doc, 200);
		});
	},


	search: function (req, res) {
		var query = req.query;
		var tags = query.tags || [];

		// tags should always be an array
		if (!_.isArray(tags)) {
			tags = [tags];
		}

		findService.run(tags, function (err, docs) {
			if (err) return res.send(505); // not found
			return res.send(docs);
		});
	},


	latest: function (req, res) {
		findLatestServ.run(function (err, docs) {
			if (err) return res.send(505); // not found
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