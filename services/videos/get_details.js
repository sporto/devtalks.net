var service = require('videoinfo');

module.exports = {
	run: function (url, cb) {
		return service.fetch(url, function (err, data) {
			if (err) return cb(err);
			console.log(data)
			if (!data) return cb(new Error('Video not found'));
			return cb(null, data);
		});
	}
};