var service = require('videoinfo');

module.exports = {
	run: function (url, cb) {
		return service.fetch(url, cb);
	}
};