// var Suggestion = require('../../models/suggestion');

var tags = require('../../collections/tags');

module.exports = {

	new: function (req, res) {

		function done(err, tags) {
			res.render('suggestions/new', {title: 'Express', tags: tags, user: req.user});
		}

		tags.uniques(done);
	}

}