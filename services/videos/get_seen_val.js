var db              = require('../../db');
var getSeenServ     = require('./get_seen');

module.exports = {
	run: function (videoId, userId, cb) {
		getSeenServ.run(videoId, userId, function (err, doc) {
			console.log('getSeenServ cb');
			console.log(err);
			console.log(doc);

			if (err) return cb(err);

			var value = false;

			if (doc) {
				value = true;
			}

			return cb(null, value);
		});

	}
};
