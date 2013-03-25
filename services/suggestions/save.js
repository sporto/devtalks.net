var db = require('../../db');

module.exports = {
	run: function (data, cb) {
		data.approved = false;
		data.kind = 'video';
		return db.insert(data, cb);
	}
}