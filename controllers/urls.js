// var youtubedl = require('youtube-dl');
var video_data = require('../modules/video_data');

module.exports = {
	show: function (req, res) {
		var url = req.query.url;
		
		video_data.get(url, function (err, info) {
			if (err) {
				res.send(404);
			}
			res.send(200, {description: info.title});
		});
		
	}
}