var getTagsService = require('../../services/tags/get_list');

module.exports = {

	new: function (req, res) {

		function done(err, tags) {
			res.render('suggestions/new', {title: 'Express', tags: tags});
		}

		getTagsService.run(done);
	}

}