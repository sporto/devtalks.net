var _    = require('underscore');
var db   = require('../../db');

/*
	@return {Array} Flat list of tags
	e.g.
	[
  	"canjs",
  	"javascript"
	]
*/

module.exports = {
	run: function (cb) {
		db.view('tags', 'weights', {group: true}, function (err, res) {
			if (err) return cb(err);
			var docs = _.pluck(res.rows, 'key');
			cb(null, docs);
		});
	}
};