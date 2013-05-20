var db =             require('../../db');
var makeUrl =        require('../../utils/videos/make_seen_url');

// return null if not found

module.exports = {
	run: function (videoId, userId, cb) {
		console.log('getSeen run');
		var url = makeUrl(videoId, userId);
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
