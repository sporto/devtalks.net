var Video = require('../../../models/video');

module.exports = {

	index: function (req, res) {
		function done(err, suggestions) {
			res.send(suggestions);
		}
		Video.suggestions(done);
	},

	create: function (req, res) {
		var data = req.body.suggestion;

		var doc = new Video(data);
		doc.approved = false;

		doc.save(function (err, doc) {
			if (err) return res.send(505);
			return res.send(200, doc);
		});
	},

	approve: function (req, res) {
		var id = req.params.suggestion;

		function findDone(err, doc) {
			if (err) return res.send(505);

			doc.approved = true;
			doc.save(function (err, doc) {
				if (err) return res.send(505);
				res.send(doc);
			});
		}

		Video.findById(id, findDone);
	},

	destroy: function (req, res) {
		var id = req.params.suggestion;

		function findDone(err, doc) {
			if (err) return res.send(505);

			doc.deleted = true;
			doc.save(function (err, doc) {
				if (err) return res.send(505);
				res.send(doc);
			});
		}

		Video.findById(id, findDone);
	}

}