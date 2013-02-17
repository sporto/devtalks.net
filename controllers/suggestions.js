var collection = require('../models/suggestions');

module.exports = {

	new: function (req, res) {
		res.render('suggestions/new', { title: 'Express', tags: ['1','blue'] });
	},

	create: function (req, res) {
		var data = req.body.suggestion;

		collection.create(data, function (err, body){
			return res.send(body);
		});
	}

}