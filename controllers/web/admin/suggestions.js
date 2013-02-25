var Video = require('../../../models/video');

module.exports = {
	index: function (req, res) {

		function done(err, suggestions) {
			res.render('admin/suggestions/index', {title: 'Express', suggestions: suggestions});
		}

		// Video.find({approved: false}).exec(done);
		Video.where('approved', false).or([{'deleted': false}, {'deleted': null}]).exec(done);

	}
}