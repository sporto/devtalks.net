var checkAuthServ =           require('./check');
var logger =                  require('../../logger');

module.exports = {
	run: function (req, res, resource, action, cb) {

		checkAuthServ.run(req.user, resource, action, function (err, val) {
			logger.info('auth result ' + val);
			if (val) {
				cb(null, req, res);
			} else {
				res.send(401);
			}
		});

	}
}