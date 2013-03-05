var Video = require('../../models/video');

module.exports = {

	index: function (req, res) {
		res.render('videos/index', {user: req.user});
	},

	show: function (req, res) {

		var id = req.params.video;
		console.log(id);

		function done(err, video) {
			console.log(video);
			res.render('videos/show', {title: 'Express', video: video, user: req.user});
		}

		Video.findById(id, done);
	}

}