var _   = require('underscore');
var db  = require('../../db');

module.exports = {
	// Find a video by a combination of provider and ID
	// cb (err, docs)
	run: function (provider, id, cb) {
		var key = provider + '-' + id;
		db.view('videos', 'providerAndId', {key: key, include_docs: true}, function (err, res) {
			if (err) return cb(err);
			var docs = _.pluck(res.rows, 'doc');
			return cb(null, docs);
		});
	}
}