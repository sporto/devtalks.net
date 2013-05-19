var db             = require('../../db');
var getFavServ     = require('./get_favourite');

module.exports = {
	run: function (videoId, userId, cb) {
		getFavServ.run(videoId, userId, function (err, doc) {
			console.log('getFavServ cb');
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
