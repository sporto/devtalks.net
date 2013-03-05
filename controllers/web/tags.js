//var db = require('../db');
var tags = require('../../collections/tags');

module.exports = {

	index: function (req, res) {

		function done(err, tags) {
			if (err) return res.send(404);
			res.render('tags/index', { title: 'Express', tags: tags, user: req.user});
		}

		tags.weights(done);

	}

}