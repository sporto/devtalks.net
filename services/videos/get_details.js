var findProvider = require('./find_provider');
var youtube = require('./youtube');
var vimeo = require('./vimeo');

var retrievers = {
	youtube: youtube,
	vimeo: vimeo
}

function run(url, cb) {
	var data = findProvider.run(url);
	var provider = data.provider;
	var id = data.id;

	if (retrievers[provider]) {
		return retrievers[provider].run(id, cb);
	} else {
		return cb(new Error('Provider not found'));
	}
}

module.exports = {
	run: run
};