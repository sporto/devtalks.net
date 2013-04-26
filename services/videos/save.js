//var when =          require('when');
var check =            require('validator').check;
var logger =           require('../../logger');
var db =               require('../../db');
var getServ =          require('./get');

function create(data, cb) {
	logger.info(' - create');
	return db.insert(data, function (err, res) {
		//send the saved document back
		return getServ.run(res.id, cb);
	});
}

function update(data, cb) {
	logger.info(' - update');
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
		logger.info('save.run');
		// validations
		try {
			check(data.url, 'Please enter a valid url').isUrl();
			check(data.title, 'Please enter the title').notEmpty();
			check(data.tags, 'Please enter some tags').isArray();
		} catch (e) {
			return cb(e);
		}
		if (data.tags.length === 0) return cb(new Error('Please enter some tags'));

		logger.info('passed validations');

		// update or create
		if(data._id) {
			return update(data, cb);
		} else {
			return create(data, cb);
		}

	}
}