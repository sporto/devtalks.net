var _   = require('underscore');
var db  = require('../../db');

module.exports = {
	run: function (cb) {
		db.view('videos', 'byCreatedAt', {limit: 12, descending: true, include_docs: true}, function (err, res) {
			if (err) return cb(err);
			var docs = _.pluck(res.rows, 'doc');
			// docs = docs.reverse();
			return cb(null, docs);
		});
	}
}