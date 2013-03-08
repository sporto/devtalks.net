var vimeo = {
	run: function () {
		return 'vimeo'
	}
}

var youtube = {
	run: function () {
		return 'youtube'
	}
}

module.exports = {

	//dependencies
	_vimeo: vimeo,
	_youtube: youtube,
	
	_getRetriever: function () {
		return this._vimeo;
	},

	run: function () {
		var ret = this._getRetriever();
		return ret.run();
	}
}