//var db = require('../db');
var Tags = require('../models/tags');

module.exports = {

	index: function (req, res) {
		var pro = Tags.all();

		pro.then(function(docs) {
				return res.send(docs);
			},
			function (err) {
				console.log(err);
				return res.send(404)
			}
		)

	}

}