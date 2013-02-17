var youtube = require('./youtube');
var vimeo = require('./vimeo');

module.exports = {
	
	getInfoByUrl: function(url, cb) {
		var provider = this._findProvider(url);

		// console.log(url)
		switch (provider) {
			case 'youtube':
				return youtube.getInfoByUrl(url, cb);
				break;
			case 'vimeo':
				return vimeo.getInfoByUrl(url, cb);
				break;
			default:
				//console.log(cb);
				// console.log('default')
				return cb(new Error('Provider not found'));
		}

	},

	_findProvider: function(url) {
		if (url.indexOf('youtube') != -1) {
			return 'youtube';
		}

		if (url.indexOf('vimeo') != -1) {
			return 'vimeo';
		}
	}

}