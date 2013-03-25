var _ = require('underscore');
var db = require('../../db');

module.exports = {
	run: function (cb) {
		db.view('tags', 'all', function (err, res) {
			if (err) return cb(err);
			var docs = _.pluck(res.rows, 'key');
			cb(null, docs);
		});
	}
};