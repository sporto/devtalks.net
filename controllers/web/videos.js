var when = require('when');
var getTagsWeightsService = require('../../services/tags/get_weights');
var getVideoService = require('../../services/videos/get');

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
		
		getVideoService.run(id, function (err, doc) {
			res.render('videos/show', {title: 'Express', video: doc, user: req.user});
		});

	}

}