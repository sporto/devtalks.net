var getTagsService = require('../../services/tags/get_list');

module.exports = {

	new: function (req, res) {

		function done(err, tags) {
			res.render('suggestions/new', {tags: tags});
		}

		getTagsService.run(done);
	}

}