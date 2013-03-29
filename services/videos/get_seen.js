var db = require('../../db');

module.exports = {
	run: function (videoId, userId, cb) {
		db.view('actions', 'seen', {key: [videoId, userId]}, function (err, res) {
			console.log('err = ' + err);
			console.log('res = ' + res);

			if (err) return cb(err);

			var seen = false;

			if (res.rows) {
				var seen = res.rows.length > 0;
			}
			
			return cb(null, seen);
		});
		//return cb(null, false);
	}
};