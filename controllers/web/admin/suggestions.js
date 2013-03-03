var Video = require('../../../models/video');

module.exports = {
	index: function (req, res) {

		function done(err, suggestions) {
			res.render('admin/suggestions/index', {title: 'Express', suggestions: suggestions});
		}

		Video.suggestions(done);

	}
}