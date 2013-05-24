var when            = require('when');
var logger          = require('../../../logger');
var getTagsService  = require('../../../services/tags/get_list');

function main(req, res) {
	logger.info('videos/new');

	function done(err, tags) {
		res.render('videos/new', {tags: tags, video: {}, pageTitle: 'Suggest a Video'});
	}

	getTagsService.run(done);
}

module.exports = main;