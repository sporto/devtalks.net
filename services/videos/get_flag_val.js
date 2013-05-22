var db              = require('../../db');
var getFlagServ     = require('./get_flag');

module.exports = {
	run: function (videoId, userId, flag, cb) {
		getFlagServ.run(videoId, userId, flag, function (err, doc) {
			console.log('getFlagServ cb');
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
