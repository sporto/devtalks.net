var logger =                 require('../../../../logger');
var markAsFavService =       require('../../../../services/videos/mark_favourite');

function main(req, res) {
	logger.info('mark_favourite.main');

	if (req.user) {
		var videoId = req.params.video;
		var userId = req.user._id;

		markAsFavService.run(videoId, userId, function (err) {
			logger.info(err);
			if (err) return res.send(400); // bad request
			res.send(200);
		});

	} else {
		logger.info('No user');
		res.send(400);
	}
}

module.exports = main;
