var findProvider = require('./find_provider');
var youtube = require('./youtube');
var vimeo = require('./vimeo');

module.exports = {
	//dependencies
	_vimeo: vimeo,
	_youtube: youtube,

	run: function (url, cb) {
		var data = findProvider.run(url);
		var provider = data.provider;
		var id = data.id;
		var retriever = this["_" + provider];

		if (retriever) {
			return retriever.run(id, cb);
		} else {
			return cb(new Error('Provider not found'));
		}
	}
};