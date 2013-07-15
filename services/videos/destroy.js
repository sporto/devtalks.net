var db         = require('../../db');
var logger     = require('../../logger');

module.exports = {
	run: function (id, cb) {
		logger.info('services/videos/destroy.run');
		db.get(id, function (err, doc) {
			if (err) return cb(err);
			doc.deleted = true;
			db.insert(doc, id, function (err, doc) {
				logger.info(doc);
				if (err) return cb(err);
				return cb(null, doc);
			});
		});
	}
}