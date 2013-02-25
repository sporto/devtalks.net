var Video = require('../models/video');
var _ = require('underscore');

module.exports = {

	/*
	returns an array with objects
	e.g.
	[
		{
		  "_id": "black",
		  "value": 5
		},
	*/
	weights: function(cb) {

		var o = {
			map: function() {
				if(!this.tags || !this.approved) {
					return;
				}
				for (index in this.tags) {
					emit(this.tags[index], 1);
				}
			},
			reduce: function(previous, current) {
				var count = 0;
				for(index in current) {
					count += current[index];
				}
				return count;
			}
		}

		Video.mapReduce(o, cb);
	},

	// returns an array with strings
	uniques: function(cb) {
		Video.find().where('approved', true).distinct('tags', cb);
	}

}