var db =            require('../../db');
var makeFavUrl =    require('../../utils/videos/make_favourite_url');

// return null if not found

module.exports = {
	run: function (videoId, userId, cb) {
		console.log('getFav run');
		var url = makeFavUrl(videoId, userId);
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
