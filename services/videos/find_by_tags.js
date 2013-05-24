var _   = require('underscore');
var db  = require('../../db');

module.exports = {
	run: function (tags, cb) {
		db.view('tags', 'all', {limit: 30, descending: true, keys: tags, include_docs: true}, function (err, res) {
			if (err) return cb(err);
			var docs = _.pluck(res.rows, 'doc');
			return cb(null, docs);
		});
	}
}