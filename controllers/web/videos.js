var Video = require('../../models/video');

module.exports = {

	index: function (req, res) {
		res.render('videos/index');
	},

	show: function (req, res) {

		var id = req.params.video;
		console.log(id);

		function done(err, video) {
			console.log(video);
			res.render('videos/show', {title: 'Express', video: video});
		}

		Video.findById(id, done);
	}

}