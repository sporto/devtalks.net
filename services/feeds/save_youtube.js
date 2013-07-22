var db          = require('../../db');
var logger      = require('../../logger');
var findServ    = require('../videos/find_by_provider_id');
var saveServ    = require('../videos/save');

module.exports = {

	// Save a youtube video from a feed
	// @param {Hash} item A feed item
	// @callback {String} DB ID

	run: function (item, mainCb) {
		var provider    = 'youtube';
		var providerId  = item.id;
		logger.info('Trying to save item ' + providerId);
		
		// find if already there
		return findServ.run(provider, providerId, function (err, docs) {
			if (err) return mainCb(err);

			if (docs.length === 0) {
				logger.info('Not found ' + providerId);
				logger.info('Saving ' + providerId);

				// prepare the doc
				var video = {
					provider:     provider,
					providerId:   providerId,
					url:          'http://www.youtube.com/watch?v=' + providerId,
					title:        item.title,
					description:  item.description,
					tags:         [item.category],
					thumbS:       item.thumbnail.sqDefault,
					thumbM:       item.thumbnail.hqDefault,
					thumbL:       item.thumbnail.hqDefault,
					duration:     item.duration,
					approved:     false
				}

				//save it
				return saveServ.run(video, function (err, doc) {
					logger.info('Video was saved ' + doc._id);
					mainCb(null, doc._id);
				});

			} else {
				logger.info('Already saved ' + providerId);
				// just return the DB id
				return mainCb(null, docs[0]._id);
			}
			
		});


	}
}