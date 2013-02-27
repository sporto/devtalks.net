var retrievers = {
	youtube: require('./youtube'),
	vimeo: require('./vimeo')
}

var idResolvers = {
	youtube: function (url) {
		return url.split('=').pop();
	},
	vimeo: function (url) {
		return url.split('/').pop();
	}
}

function run(url, cb) {

	var provider = findProvider(url);
	var id = findId(url);

	console.log(id);

	if (retrievers[provider]) {
		return retrievers[provider].run(id, cb);
	} else {
		return cb(new Error('Provider not found'));
	}
}

function findProvider(url) {
	if (url.indexOf('youtube') != -1) {
		return 'youtube';
	}

	if (url.indexOf('vimeo') != -1) {
		return 'vimeo';
	}
}

function findId(url) {
	var provider = findProvider(url);
	if (idResolvers[provider]) {
		return idResolvers[provider](url);
	} else {
		return '';
	}
}

module.exports = {
	run: run
};