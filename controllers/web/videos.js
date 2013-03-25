var when = require('when');
var getTagsWeightsService = require('../../services/tags/get_weights');

module.exports = {

	index: function (req, res) {
		var def = when.defer();

		def.then(function(tags) {
			res.render('videos/index', {user: req.user, tags: tags});
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
		console.log(id);

		function done(err, video) {
			//console.log(video);
			res.render('videos/show', {title: 'Express', video: video, user: req.user});
		}

		Video.findById(id, done);
	}

}