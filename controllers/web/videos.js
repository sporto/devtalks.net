var when = require('when');
var getTagsWeightsService =		require('../../services/tags/get_weights');
var getVideoService =					require('../../services/videos/get');
var getSeenServ =							require('../../services/videos/get_seen');

module.exports = {

	index: function (req, res) {
		var def = when.defer();

		def.then(function(tags) {
			res.render('videos/index', {tags: tags});
		}, function () {
			res.send(500);
		});

		getTagsWeightsService.run(function (err, tags) {
			if (err) {
				def.reject(new Error(err));
			} else {
				def.resolve(tags);
			}
		});
		
	},

	show: function (req, res) {

		var id = req.params.video;

		var defVideo = when.defer();
		var defSeen = when.defer();
		var all = when.all([defVideo, defSeen]);

		getVideoService.run(id, function (err, doc) {
			if (err) {
				defVideo.reject(err);
			} else {
				defVideo.resolve(doc);
			}
		});

		// get video seen only if there is a logged in user
		if (req.user) {
			var userId = req.user._id;
			getSeenServ.run(id, userId, function (err, val) {
				if (err) {
					defSeen.reject(err);
				} else {
					defSeen.resolve(val);
				}
			});
		} else {
			// no user
			defSeen.resolve(false);
		}

		all.then(function (arr) {
			var doc = arr[0];
			doc.seen = arr[1];
			res.render('videos/show', {video: doc, title: "Videos for Geeks - " + doc.title});
		}, function () {
			res.send(400);
		});


	}

}