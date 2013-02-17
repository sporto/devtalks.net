var Suggestions = require('../../models/suggestions');
var Tags = require('../../models/tags');

module.exports = {

	new: function (req, res) {
		var pro = Tags.all();

		pro.then(function (tags) {
			res.render('suggestions/new', { title: 'Express', tags: tags });
		});

	},

	create: function (req, res) {
		var data = req.body.suggestion;

		console.log(data);

		var pro = Suggestions.create(data);

		pro.then(function (body){
			return res.send(body);
		}, function (err) {
			console.log(err);
			return res.send(505);
		});
	}

}