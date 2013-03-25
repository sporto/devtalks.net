var db = require('../../db');

module.exports = {
	run: function (id, cb) {
		db.get(id, function (err, doc) {
			if (err) return cb(err);
			doc.approved = true;
			db.insert(doc, id, function (err, doc) {
				if (err) return cb(err);
				return cb(null, doc);
			});
		});
	}
}