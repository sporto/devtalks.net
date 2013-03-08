var idResolvers = {
	youtube: function (url) {
		return url.split('=').pop();
	},
	vimeo: function (url) {
		return url.split('/').pop();
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

/*
@public
@param {String} url
*/
function run(url) {
	return {
		provider: findProvider(url),
		id: findId(url)
	}
}

module.exports = {
	run: run
};