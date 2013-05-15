// var async = require('async');
var logger       = require('../../logger');
var db           = require('../../db');

module.exports = {
	run: function (videoId, userId, cb) {
		logger.info('mark_favourite_service.run');

		var doc = {
			kind: 'favourite',
			videoId: videoId,
			userId: userId
		}

		// TODO check if already there
		db.insert(doc, cb);
		//cb(null, {});
	}
};