// var youtubedl = require('youtube-dl');
var video_data = require('../../services/video_data');

module.exports = {
	show: function (req, res) {
		var url = req.query.url;

		video_data.getInfoByUrl(url, function (err, info) {
			if (err) {
				return res.send(404);
			}

			res.send(200, info);
		});
		
	}
}