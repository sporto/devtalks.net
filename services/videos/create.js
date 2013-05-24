var logger        = require('../../logger');
var videoinfo     = require('videoinfo');
var saveServ      = require('./save');
var findByUrlServ = require('./find_by_url');

module.exports = {
	run: function (data, cb) {
		logger.info('create.run');
		logger.info(data);

		data.approved = false;
		data.createdAt = new Date();
		data.kind = 'video';
		data.provider =    videoinfo.getProvider(data.url);
		data.providerId =  videoinfo.getId(data.url);

		logger.info(data);

		// check the url
		findByUrlServ.run(data.url, function (err, docs) {
			if(err) return cb(err);

			logger.info('doc found' + docs.length);

			if (docs.length > 0) {
				return cb(new Error('This url has alredy been submitted'));
			} else {
				logger.info('calling saveServ');
				return saveServ.run(data, cb);
			}
		});

		
	}
}