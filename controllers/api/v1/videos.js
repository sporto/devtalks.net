var _ =                       require('underscore');
var logger =                  require('../../../logger');
var createService =           require('../../../services/videos/create');
var approveService =          require('../../../services/videos/approve');
var destroyService =          require('../../../services/videos/destroy');
var findService =             require('../../../services/videos/find_by_tags');
var findLatestServ =          require('../../../services/videos/find_latest');
var markAsSeenService =       require('../../../services/videos/mark_seen');
var saveService =             require('../../../services/videos/save');
var authServ =                require('../../../services/authorisations/authorise');

function updateProceed(err, req, res) {
	saveService.run(req.body, function (err, doc) {
		if (err) return res.send(500);
		return res.send(doc, 200);
	});
}

module.exports = {

	create: function (req, res) {
		var data = req.body;
		logger.info(data);
		//console.log(data)
		createService.run(data, function (err, doc) {
			if (err) return res.send(500, err.message);
			return res.send(200, doc);
		});
	},

	
	update: function (req, res) {
		return authServ.run(req, res, 'video', 'update', updateProceed);
	},


	search: function (req, res) {
		var query = req.query;
		var tags = query.tags || [];

		// tags should always be an array
		if (!_.isArray(tags)) {
			tags = [tags];
		}

		findService.run(tags, function (err, docs) {
			if (err) return res.send(404); // not found
			return res.send(docs);
		});
	},


	latest: function (req, res) {
		findLatestServ.run(function (err, docs) {
			if (err) return res.send(404); // not found
			return res.send(docs);
		});
	},


	mark_seen: function (req, res) {
		if (req.user) {
			var videoId = req.params.video;
			var userId = req.user._id;

			markAsSeenService.run(videoId, userId, function (err) {
				if (err) return res.send(400); // bad request
				res.send(200);
			});

		} else {
			res.send(400);
		}
	},

	approve: function (req, res) {
		//needs auth
		var id = req.params.video;
		approveService.run(id, function (err, doc) {
			if (err) return res.send(500);
			res.send(doc);
		});
	},

	destroy: function (req, res) {
		//needs auth
		var id = req.params.suggestion;
		destroyService.run(id, function (err, doc) {
			if (err) return res.send(500);
			res.send(doc);
		});
	}

}