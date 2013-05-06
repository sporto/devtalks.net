var when =                    require('when');
var getTagsWeightsService =   require('../../../services/tags/get_weights');

function main(req, res) {
	console.log('videos/index');
	var def = when.defer();

	def.then(function(tags) {
		res.render('videos/index', {tags: tags});
	}, function () {
		res.send(500);
	});

	getTagsWeightsService.run({limit: 30, weightOrder: true}, function (err, tags) {
		//console.log(err);
		if (err) {
			def.reject(new Error(err));
		} else {
			def.resolve(tags);
		}
	});
	
}

module.exports = main;