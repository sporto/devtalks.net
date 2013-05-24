var db   = require('../../db');
var _    = require('underscore');

module.exports = {
	run: function (cb) {
		return db.view('videos', 'unapproved', {include_docs: false}, function (err, res) {
			if (err) return cb(err);

			var docs = _.pluck(res.rows, 'key');
			cb(null, docs);
		});
	}
}