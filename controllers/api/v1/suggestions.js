// var Video = require('../../../models/video');
var createService = require('../../../services/suggestions/create');
var approveService = require('../../../services/suggestions/approve');
var destroyService = require('../../../services/videos/destroy');
var getAllService = require('../../../services/suggestions/get_all');

module.exports = {

	index: function (req, res) {
		getAllService.run(function (err, suggestions) {
			res.send(suggestions);
		});
	},

	create: function (req, res) {
		var data = req.body.suggestion;
		createService.run(data, function (err, doc) {
			if (err) return res.send(505, err.message);
			return res.send(200, doc);
		});
	},

	approve: function (req, res) {
		var id = req.params.suggestion;
		approveService.run(id, function (err, doc) {
			if (err) return res.send(505);
			res.send(doc);
		});
	},

	destroy: function (req, res) {
		var id = req.params.suggestion;
		destroyService.run(id, function (err, doc) {
			if (err) return res.send(505);
			res.send(doc);
		});
	}

}