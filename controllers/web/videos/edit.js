var when                   = require('when');
var getTagsService         = require('../../../services/tags/get_list');
var authServ               = require('../../../services/authorisations/authorise');
var getVideoService        = require('../../../services/videos/get');
var logger                 = require('../../../logger');

function main(req, res) {
	console.log('controllers/videos/edit');
	logger.info('controllers/videos/edit');
	return authServ.run(req, res, 'video', 'manage', process);
}

function process(err, req, res) {
	//get the video
	var id = req.params.video;

	var defTags = when.defer();
	var defVideo = when.defer();
	var all = when.all([defTags, defVideo]);

	logger.info('Getting tags');
	getTagsService.run(function (err, tags) {
		logger.info('Got tags');
		defTags.resolve(tags);
	});

	logger.info('Getting video');
	getVideoService.run(id, function (err, doc) {
		logger.info('Getting video');
		logger.info(doc);
		defVideo.resolve(doc);
	});

	all.then(function (arr) {
		var tags = arr[0];
		var video = arr[1];
		res.render('videos/edit', {tags: tags, video: video, pageTitle: 'Edit Video'});
	}, function () {
		res.send(500);
	});
}

module.exports = main;