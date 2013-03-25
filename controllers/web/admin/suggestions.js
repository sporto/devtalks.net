// var Video = require('../../../models/video');
var getAllService = require('../../../services/suggestions/get_all');

module.exports = {
	index: function (req, res) {

		// function done(err, suggestions) {
		// 	res.render('admin/suggestions/index', {title: 'Express', suggestions: suggestions, user: req.user});
		// }

		// getAllService.run(done);

		res.render('admin/suggestions/index', {title: 'Express', suggestions: [], user: req.user});

	}
}