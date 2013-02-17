var db = require('../db');
var collection = require('../models/suggestions');

module.exports = {

	new: function (req, res) {
		res.render('suggestions/new', { title: 'Express', tags: ['1','blue'] });
	},

	create: function (req, res) {
		var doc = collection.new(req.body.suggestion);
		db.insert(doc, function (err, body) {
			res.send(body);
		});
	}

}