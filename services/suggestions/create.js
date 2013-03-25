var db = require('../../db');
var videoinfo = require('videoinfo');

module.exports = {
	run: function (data, cb) {
		data.approved = false;
		data.kind = 'video';
		data.provider = videoinfo.getProvider(data.url);
		return db.insert(data, cb);
	}
}