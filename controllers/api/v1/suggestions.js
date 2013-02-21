var Suggestions = require('../../../models/suggestions');

module.exports = {

	create: function (req, res) {
		console.log('suggestions - create')
		var data = req.body.suggestion;
		console.log(data);

		var done = function (err, body) {
			console.log(err);
			console.log(body);
			if (err) {
				return res.send(505);
			} else {
				console.log('Sending 200')
				return res.send(200, body);
			}
		}

		return Suggestions.create(data, done);
	}

}