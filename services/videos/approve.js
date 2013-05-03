var db = require('../../db');

module.exports = {
	run: function (id, cb) {
		if (id == null) {
			return cb(new Error('Id invalid'));
		}
		console.log('id', id);
		db.get(id, function (err, doc) {
			if (err) return cb(err);
			doc.approved = true;
			db.insert(doc, id, function (err, doc) {
				if (err) return cb(err);
				console.log(doc);
				return cb(null, doc);
			});
		});
	}
}