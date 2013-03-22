var ytdl = require('ytdl');

function run(url, id, cb) {
	return ytdl.getInfo(url, function (err, data) {
		if (err) return cb(err);

		var info = {
			providerId: data.video_id,
			title: data.title,
			description: "",
			thumbS: data.thumbnail_url,
			thumbM: data.thumbnail_url,
			thumbL: data.thumbnail_url
		}
		return cb(null, info);
	});
}

module.exports = {
	run: run
};