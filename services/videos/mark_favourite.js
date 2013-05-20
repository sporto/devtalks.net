// var async = require('async');
var logger          = require('../../logger');
var db              = require('../../db');
var getFavServ      = require('./get_favourite');
var makeFavUrl      = require('../../utils/videos/make_favourite_url');

module.exports = {
	run: function (videoId, userId, value, cb) {
		logger.info('mark_favourite_service.run');
		logger.info(videoId);
		logger.info(userId);
		logger.info(value);

		getFavServ.run(videoId, userId, function (err, doc) {
			var url = makeFavUrl(videoId, userId);

			if (value) {
				if (doc) {
					logger.info('found');
					logger.info(doc);
					cb(null, true);
				} else {
					logger.info('no fav found');
					logger.info('creating new fav doc');
					
					var doc = {
						kind: 'favourite',
						videoId: videoId,
						userId: userId
					}
					db.insert(doc, url, cb);
				}
			} else {
				if (doc) {
					// delete the doc
					db.destroy(url, doc._rev, cb);
				} else {
					return cb(null, true);
				}
			}
		
		});

	}
};