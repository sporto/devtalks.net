var markAsSeenService =       require('../../../../services/videos/mark_seen');

function main(req, res) {
	if (req.user) {
		var videoId = req.params.video;
		var userId = req.user._id;

		markAsSeenService.run(videoId, userId, function (err) {
			if (err) return res.send(400); // bad request
			res.send(200);
		});

	} else {
		res.send(400);
	}
}

module.exports = main;
