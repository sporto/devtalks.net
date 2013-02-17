//var db = require('../db');
var collection = require('../models/tags');

module.exports = {

	index: function (req, res) {
		collection.all(function(err, docs) {
			res.send(docs);
		});
	}

}