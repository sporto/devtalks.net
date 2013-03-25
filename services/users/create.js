var db = require('../../db');

module.exports = {
	run: function (data, cb) {
		data.kind = 'user';
		return db.insert(data, cb);
	}
}