var async       = require('async');
var saveServ    = require('./save_youtube');
var logger      = require('../../logger');

module.exports = {
	// Save all feed items
	// @param {Array} items
	// @callback {Array} DB ids
	run: function (items, cb) {
		logger.info('Saving Batch');
		async.map(items, saveServ.run, cb);
	}
}