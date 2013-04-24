var when =          require('when');
var db =            require('../../db');
var videoinfo =     require('videoinfo');
var check =         require('validator').check;
// var findByUrlServ = require('../videos/find_by_url');

function create(data, cb) {
	data.approved = false;
	data.createdAt = new Date();
	data.kind = 'video';
	data.provider = videoinfo.getProvider(data.url);
	data.providerId = videoinfo.getId(data.url);
	return db.insert(data, cb);
}

function update(data, cb) {
	var id = data._id;
	db.get(id, function (err, doc) {
		if (err) return cb(err);
		data._rev = doc._rev;
		db.insert(data, id, function (err, res) {
			if (err) return cb(err);
			return cb(null, data);
		});
	});
}

module.exports = {
	run: function (data, cb) {
		// validations
		try {
			check(data.url, 'Please enter a valid url').isUrl();
			check(data.title, 'Please enter the title').notEmpty();
			check(data.tags, 'Please enter some tags').isArray();
		} catch (e) {
			return cb(e);
		}
		if (data.tags.length === 0) return cb(new Error('Please enter some tags'));

		// update or create
		if(data._id) {
			update(data, cb);
		} else {
			// check the url if new
			findByUrlServ.run(data.url, function (err, docs) {
				if (docs.length > 0) {
					return cb(new Error('This url has alredy been submitted'));
				} else {
					create(data, cb);
				}
			});
		}

	}
}