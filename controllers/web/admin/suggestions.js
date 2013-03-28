var getAllService = require('../../../services/suggestions/get_all');
var checkAuthServ = require('../../../services/authorisations/check');

module.exports = {
	index: function (req, res) {
		checkAuthServ.run(req.user, 'suggestion', 'manage', function (err, val) {
			if (val) {
				res.render('admin/suggestions/index', {suggestions: []});
			} else {
				res.send(401);
			}
		});

	}
}