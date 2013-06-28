var logger      = require('../../logger');
var youtube     = require('youtube-feeds');

module.exports = {
	run: function (args, cb) {

		var start = args.start || 1;

		var tags = [
			'conference programing',
			'programming',

			//events
			'google io',
			'node conf',
			'ruby conf',
			'javascript conf',

			//dbs
			'couchdb',
			'hadoop',
			'mongodb',
			'riak',
			'postgres',
			'mysql',
			
			//languages
			'actionscript',
			'c#',
			'clojure',
			'coffeescript',
			'dart',
			'erlang',
			'golang',
			'go language',
			'haskell',
			'java',
			'javascript',
			'lua',
			'prolog',
			'ruby',
			'pearl',
			'php',
			'python',
			'scala'
		];

		logger.info('running search youtube');

		youtube.feeds.videos( {
			category:    tags.join('|'),
			orderby:     'published',
			'max-results': 25,
			'start-index': start
		},
		cb);

	}
}