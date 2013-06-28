var async       = require('async');
var saveServ    = require('./save_youtube');
var logger      = require('../../logger');

module.exports = {
	run: function (items, cb) {
		logger.info('Saving Batch');
		async.map(items, saveServ.run, cb);
	}
}