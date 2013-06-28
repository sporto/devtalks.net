var _   = require('underscore');
var db  = require('../../db');

module.exports = {
	// Find a video by the complete url
	// e.g. http://www.youtube.com/watch?v=Trurfqh_6fQ
	// NOTE one video can have multiple URL, this needs to be deprecated
	run: function (url, cb) {
		db.view('videos', 'url', {key: url, include_docs: true}, function (err, res) {
			if (err) return cb(err);
			var docs = _.pluck(res.rows, 'doc');
			return cb(null, docs);
		});
	}
}