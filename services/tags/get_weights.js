var _ = require('underscore');
var db = require('../../db');

/*
	@return {Array} Array with objects
	e.g.
	[
	  {
	    "key": "canjs",
	    "value": 2
	  },
	  {
	    "key": "javascript",
	    "value": 5
	  }
	]
*/

module.exports = {
	run: function (cb) {
		console.log('tags/get_weights');
		db.view('tags', 'weights', {group: true}, function (err, res) {
			if (err) return cb(err);
			cb(null, res.rows);
		});
	}
};