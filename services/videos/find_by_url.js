var _   = require('underscore');
var db  = require('../../db');

module.exports = {
	run: function (url, cb) {
		db.view('videos', 'url', {key: url, include_docs: true}, function (err, res) {
			if (err) return cb(err);
			var docs = _.pluck(res.rows, 'doc');
			return cb(null, docs);
		});
	}
}