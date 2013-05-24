var _    = require('underscore');
var db   = require('../../db');

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
	/*
	@param {Number} args.limit Number of tags to retrieve
	@param {Boolean} args.weightOrder Order by weight (instead of alphabetic)
	*/
	run: function (args, cb) {
		//console.log('tags/get_weights');
		var params = {group: true};
		// if (args.limit) {
		// 	//params['limit'] = args.limit;
		// }

		db.view('tags', 'weights', params, function (err, res) {
			if (err) return cb(err);
			if (args.weightOrder) {
				res.rows.sort(function(a, b) {
					return b.value - a.value;
				});
				//res.rows.reverse();
			}
			if (args.limit) {
				res.rows.splice(args.limit);
			}
			cb(null, res.rows);
		});
	}
};