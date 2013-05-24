var _    = require('underscore');
var db   = require('../../db');

module.exports = {
	run: function (provider, providerId, cb) {
		db.view('users', 'provider', {key: [provider, providerId], include_docs: true}, function (err, res) {
			if (err) return cb(err);
			return cb(null, res.rows[0]);
		});
	}
}