var video_data = require('../../../services/videos/get_details');

module.exports = {
	show: function (req, res) {
		var url = req.query.url;

		video_data.run(url, function (err, info) {
			console.log(err);
			// console.log(info);
			if (err) {
				return res.send(404);
			}

			// console.log(info)
			res.send(200, info);
		});
		
	}
}