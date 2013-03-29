var db = require('../../db');
var videoinfo = require('videoinfo');
var check = require('validator').check;
var findByUrlServ = require('../videos/find_by_url');

module.exports = {
	run: function (data, cb) {
		try {
			check(data.url, 'Please enter a valid url').isUrl();
			check(data.title, 'Please enter the title').notEmpty();
			check(data.tags, 'Please enter some tags').isArray();
		} catch (e) {
			return cb(e);
		}

		if (data.tags.length === 0) return cb(new Error('Please enter some tags'));

		// check the url
		findByUrlServ.run(data.url, function (err, docs) {

			if (docs.length > 0) {
				return cb(new Error('This url has alredy been submitted'));
			} else {
				if (data.tags.length === 0) {
					return cb(new Error("Please enter some tags"));
				}

				data.approved = false;
				data.kind = 'video';
				data.provider = videoinfo.getProvider(data.url);
				data.providerId = videoinfo.getId(data.url);

				return db.insert(data, cb);
			}
		});


	}
}