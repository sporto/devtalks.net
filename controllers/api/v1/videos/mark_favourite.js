var logger =                 require('../../../../logger');
var markAsFavService =       require('../../../../services/videos/mark_favourite');

function main(req, res) {
	logger.info('mark_favourite.main');

	if (req.user) {
		// console.log(req.body);
		var videoId  = req.params.video;
		var value    = req.body.value;
		var userId   = req.user._id;

		console.log(videoId);
		console.log(value);

		markAsFavService.run(videoId, userId, value, function (err, doc) {
			// logger.info(err);
			// logger.info(doc);
			if (err) return res.send(400); // bad request
			res.send(200);
		});

	} else {
		logger.info('No user');
		res.send(400);
	}
}

module.exports = main;
