var db = require('../../db');

module.exports = {
	run: function (videoId, userId, cb) {
		db.view('sights', 'by_user', {key: [videoId, userId]}, function (err, res) {

			if (err) return cb(err);

			var seen = false;

			if (res.rows) {
				seen = res.rows.length > 0;
			}
			
			return cb(null, seen);
		});

	}
};
