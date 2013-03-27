var db = require('../../db');

module.exports = {
	run: function (videoId, userId, cb) {
		var doc = {
			kind: 'action',
			action: 'seen',
			videoId: videoId,
			userId: userId
		}
		return db.insert(doc, cb);
	}
};