module.exports = {
	
	get: function(url, cb) {
		var provider = this._findProvider(url);
		if (!provider) {
			return cb(new Error('Provider not found'));
		}
		return cb(null, {title: 'Cool ' + provider});
	},

	_findProvider: function(url) {
		if (url.indexOf('youtube') != -1) {
			return 'youtube';
		}
	}

}