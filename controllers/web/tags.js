//var db = require('../db');
var Tags = require('../../models/tags');
var _ = require('underscore');

module.exports = {

	index: function (req, res) {
		var pro = Tags.raw();

		pro.then(function(tags) {
				var grouped = {};
				tags.forEach(function (el) {
					grouped[el] = grouped[el] || 0;
					grouped[el] += 1;
				});

				grouped = _.pairs(grouped);

				//console.log(grouped);

				res.render('tags/index', { title: 'Express', groupedTags: grouped });
			},
			function (err) {
				return res.send(404)
			}
		)

	}

}