var logger      = require('../../logger');
var youtube     = require('youtube-feeds');
var tags        = require('./keywords');

// Search videos in youtube
// @param {Hash} [args]
//   @param {Int} [args.start]
//   @param {Int} [args.maxResults]

module.exports = {
	run: function (args, cb) {

		var start       = args.start || 1;
		var maxResults  = args.maxResults || 25;

		logger.info('running search youtube');

		youtube.feeds.videos( {
			category:    tags.join('|'),
			orderby:     'published',
			'max-results': maxResults,
			'start-index': start
		},
		cb);

	}
}