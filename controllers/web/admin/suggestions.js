var logger =                 require('../../../logger');
var getUnapprovedServ =      require('../../../services/videos/get_unapproved');
var authServ =               require('../../../services/authorisations/authorise');



module.exports = {

	index: function (req, res) {
		logger.info('suggestions.index');

		function authDone(err) {
			logger.info('authDone');

			getUnapprovedServ.run(function (err, videos) {
				res.render('admin/suggestions/index', {videos: videos});
			});
			
		}

		return authServ.run(req, res, 'video', 'manage', authDone);
	}

}