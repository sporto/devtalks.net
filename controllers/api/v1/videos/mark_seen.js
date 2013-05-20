var logger =                 require('../../../../logger');
var markAsSeenService =       require('../../../../services/videos/mark_seen');

function main(req, res) {
	if (req.user) {
		var videoId    = req.params.video;
		var value      = req.body.value;
		var userId     = req.user._id;

		markAsSeenService.run(videoId, userId, value, function (err) {
			if (err) return res.send(400); // bad request
			res.send(200);
		});

	} else {
		logger.info('No user');
		res.send(400);
	}
}

module.exports = main;
