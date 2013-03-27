var async = require('async');
var db = require('../../db');
var updateWatchCountServ = require('./update_watch_count');

module.exports = {
	run: function (videoId, userId, mainCallback) {
		var doc = {
			kind: 'action',
			action: 'seen',
			videoId: videoId,
			userId: userId
		}
		// update the video count
		return async.parallel([
				function (cb) {
					db.insert(doc, cb);
				},
				function (cb) {
					updateWatchCountServ.run(videoId, 1, cb);
				}
			], mainCallback);
	}
};