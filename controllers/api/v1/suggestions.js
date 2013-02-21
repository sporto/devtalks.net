var Suggestion = require('../../../models/suggestion');
var db = require('../../../db');

module.exports = {

	create: function (req, res) {
		console.log('suggestions - create')
		var data = req.body.suggestion;

		var doc = new Suggestion(data);

		db.connect();
		doc.save(function (err, doc) {
			if (err) return res.send(505);
			return res.send(200, doc);
		});
	}

}