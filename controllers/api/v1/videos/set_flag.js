var logger          = require('../../../../logger');
var setFlagService  = require('../../../../services/videos/set_flag');

function main(req, res, flag) {
	if (req.user) {
		var videoId    = req.params.video;
		var value      = req.body.value;
		var userId     = req.user._id;

		setFlagService.run(videoId, userId, flag, value, function (err) {
			if (err) return res.send(400); // bad request
			res.send(200);
		});

	} else {
		logger.info('No user');
		res.send(400);
	}
}

module.exports = main;
