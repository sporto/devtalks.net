var db = require('../../db');

module.exports = {
	run: function (videoId, count, cb) {
		db.get(videoId, function (err, doc) {
			if (err) return cb(err);
			doc.watchCount = doc.watchCount || 0;
			doc.watchCount += count;
			
			db.insert(doc, videoId, function (err, doc) {
				if (err) return cb(err);
				return cb(null, doc);
			});
		});
	}
};