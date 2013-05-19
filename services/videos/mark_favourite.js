// var async = require('async');
var logger          = require('../../logger');
var db              = require('../../db');
var getFavServ      = require('./get_favourite');
var makeFavUrl      = require('../../utils/videos/make_favourite_url');

module.exports = {
	run: function (videoId, userId, value, cb) {
		logger.info('mark_favourite_service.run');

		getFavServ.run(videoId, userId, function (err, doc) {
			var url = makeFavUrl(videoId, userId);

			if (value) {
				if (doc) {
					console.log('found');
					console.log(doc);
					cb(null, true);
				} else {
					console.log('no fav found');
					console.log('creating new fav doc');
					
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