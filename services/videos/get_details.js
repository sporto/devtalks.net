var findProvider = require('./find_provider');

var retrievers = {
	youtube: require('./youtube'),
	vimeo: require('./vimeo')
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