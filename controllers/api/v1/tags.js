var Video		= require('../../../models/video');
var Tags		= require('../../../collections/tags');

module.exports = {

	index: function (req, res) {

		function done(err, docs) {
			if (err) return res.send(404);
			return res.send(docs);
		}

		Tags.weights(done);
	},

	videos: function(req, res) {
		var id = req.params.tag;

		function done(err, docs) {
			// console.log(docs);
			if (err) return res.send(505);
			return res.send(docs);
		}

		Video.find({'tags': id, 'approved': true}).exec(done);

		res.send('ok');
	}

}