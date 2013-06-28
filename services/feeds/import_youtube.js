var logger         = require('../../logger');
var async          = require('async');
var searchServ     = require('./search_youtube');
var saveBatchServ  = require('./save_batch_youtube');

module.exports = {
	run: function (cb) {

		// get videos from search
		// save each video in db with unapproved flag

		logger.info('running import youtube');

		var start = 1;
		var max = 50;

		logger.info('Running while loop');

		async.whilst(
			function () {
				return start < max;
			},
			function (callback) {
				logger.info('Current start is ' + start);

				searchServ.run({start: start}, function (err, res) {
					logger.info('Got results from search');
					logger.info('Results count = ' + res.items.length);
					//save each one in the DB
					saveBatchServ.run(res.items, callback);
				});
				start++;
			},
			cb
		);


	}
}