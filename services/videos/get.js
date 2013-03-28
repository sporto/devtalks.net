var db = require('../../db');
var videoInfo = require('videoinfo');

module.exports = {
	run: function (id, cb) {
		return db.get(id, function (err, doc) {
			// add the provider id to the video
			doc.providerId = videoInfo.getId(doc.url);
			return cb(null, doc);
		});
	}
};