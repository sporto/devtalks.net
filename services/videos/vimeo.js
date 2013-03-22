var video = require('n-vimeo').video;

function run(url, id, cb) {
	return video(id, function (err, data){
		if (err) return cb(err);
		// Here the API expose three new objects: raw, thumb, username

		var info = {
			providerId: id,
			title: data.raw.title,
			description: data.raw.description,
			thumbS: data.thumb.s,
			thumbM: data.thumb.m,
			thumbL: data.thumb.l
		}
		return cb(null, info);
	});
}

module.exports = {
	run: run
};