var Video = require('../../../models/video');

module.exports = {

	index: function (req, res) {
		function done(err, suggestions) {
			res.send(suggestions);
		}

		Video.find({approved: false}).exec(done);
	},

	create: function (req, res) {
		//console.log('suggestions - create')
		var data = req.body.suggestion;

		var doc = new Video(data);
		doc.approved = false;

		doc.save(function (err, doc) {
			if (err) return res.send(505);
			return res.send(200, doc);
		});
	},

	approve: function (req, res) {
		var id = req.params.id;

		function findDone(err, doc) {
			if (err) return res.send(505);

			doc.approved = true;
			doc.save(function (err) {
				if (err) return res.send(505);
				res.send(200);
			});
		}

		Video.findById(id, findDone);
	},

	destroy: function (req, res) {
		var id = req.params.suggestion;
		// console.log(id);

		function findDone(err, doc) {
			if (err) return res.send(505);

			//console.log(doc)

			doc.deleted = true;
			doc.save(function (err) {
				if (err) return res.send(505);
				res.send(200);
			});
		}

		Video.findById(id, findDone);
	}

}