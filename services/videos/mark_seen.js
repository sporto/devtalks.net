var logger                  = require('../../logger');
var async                   = require('async');
var db                      = require('../../db');
var getSeen                 = require('./get_seen');
var makeUrl                 = require('../../utils/videos/make_seen_url');
var updateWatchCountServ    = require('./update_watch_count');

module.exports = {
	run: function (videoId, userId, value, cb) {

		getSeen.run(videoId, userId, function (err, doc) {
			var url = makeUrl(videoId, userId);

			if (value) {
				if (doc) {
					cb(null, true);
				} else {
					var doc = {
						kind: 'seen',
						videoId: videoId,
						userId: userId
					}
					db.insert(doc, url, cb);
				}
			} else {
				if (doc) {
					db.destroy(url, doc._rev, cb);
				} else {
					return cb(null, true);
				}
			}
		});

	
		// update the video count
		// return async.parallel([
		// 		function (cb) {
		// 			db.insert(doc, cb);
		// 		},
		// 		function (cb) {
		// 			updateWatchCountServ.run(videoId, 1, cb);
		// 		}
		// 	], mainCallback);
	}
};