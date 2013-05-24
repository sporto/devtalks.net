var logger              = require('../../../logger');
var getDetailsService   = require('../../../services/videos/get_details');

module.exports = {

	// get video details based on the url
	show: function (req, res) {
		var url = req.query.url;

		logger.log('url', url);
		
		getDetailsService.run(url, function (err, info) {
			//console.log(err);
			if (err) {
				return res.send(404);
			}

			res.send(200, info);
		});
		
	}
}