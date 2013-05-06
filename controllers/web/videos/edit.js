var when =                    require('when');
// var getTagsWeightsService =   require('../../../services/tags/get_weights');
var authServ =                require('../../../services/authorisations/authorise');
var getVideoService =         require('../../../services/videos/get');

function main(req, res) {
	return authServ.run(req, res, 'video', 'update', process);
}

function process(err, req, res) {
	//get the video
	var id = req.params.video;

	var defTags = when.defer();
	var defVideo = when.defer();
	var all = when.all([defTags, defVideo]);

	getTagsService.run(function (err, tags) {
		defTags.resolve(tags);
	});

	getVideoService.run(id, function (err, doc) {
		// console.log(doc)
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