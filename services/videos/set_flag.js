// var async = require('async');
var logger          = require('../../logger');
var db              = require('../../db');
var getFlagServ     = require('./get_flag');
var makeFlagId      = require('../../utils/videos/make_flag_id');

module.exports = {
	run: function (videoId, userId, flag, value, cb) {
		logger.info('set_flag.run');
		logger.info(videoId);
		logger.info(userId);
		logger.info(flag);
		logger.info(value);

		var id = makeFlagId(videoId, userId, flag);

		getFlagServ.run(videoId, userId, flag, function (err, doc) {

			if (value) {
				if (doc) {
					logger.info('found');
					logger.info(doc);
					cb(null, true);
				} else {
					logger.info('no fav found');
					logger.info('creating new fav doc');
					
					var doc = {
						kind: 'flag',
						videoId: videoId,
						userId: userId,
						flag: flag
					}
					db.insert(doc, id, cb);
				}
			} else {
				if (doc) {
					// delete the doc
					db.destroy(id, doc._rev, cb);
				} else {
					return cb(null, true);
				}
			}
		
		});

	}
};