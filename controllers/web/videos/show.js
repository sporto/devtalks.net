var when =                    require('when');
var getVideoService =         require('../../../services/videos/get_using_user');

function main(req, res) {

	var id    = req.params.video;
	var user  = req.user;

	getVideoService.run(id, user, function (err, doc) {
		if (err) {
			res.send(400);
		} else {
			res.render('videos/show', {video: doc, title: "devTalks - " + doc.title});
		}
	});
	
}

module.exports = main;