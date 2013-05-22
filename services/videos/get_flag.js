var db =            require('../../db');
var makeFlagId =    require('../../utils/videos/make_flag_id');

// return null if not found

module.exports = {
	run: function (videoId, userId, flag, cb) {
		console.log('getFav run');
		var url = makeFlagId(videoId, userId, flag);
		console.log('url = ', url);
		db.get(url, function (err, body) {
			console.log(err);
			console.log(body);

			if (err) {
				return cb(null, null);
			}

			return cb(null, body);
		});
	}
};
