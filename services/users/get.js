var db = require('../../db');

module.exports = {
	run: function (id, cb) {
		return db.get(id, cb);
	}
};