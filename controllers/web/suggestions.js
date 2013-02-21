var Suggestions = require('../../models/suggestions');
var Tags = require('../../models/tags');

module.exports = {

	new: function (req, res) {

		function done(err, tags) {
			res.render('suggestions/new', { title: 'Express', tags: tags });
		}

		Tags.all(done);
	}

}