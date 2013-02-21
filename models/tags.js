var db = require('../db.js');
var _ = require('underscore');

var template = {
	kind: 'tag'
}

module.exports = {
	
	all: function(cb) {

		return cb(null, [])

		// var q = db.q.table('suggestions').concatMap(function(doc){
		// 	return doc('tags')
		// }).distinct();

		// var all = [];
		
		// db.send(q, function (res) {
		// 	if (res) {
		// 		all.push(res);
		// 		return true;
		// 	} else {
		// 		return cb(null, all);
		// 	}
		// });
	},

	raw: function (cb) {
		var all = [];

		var q = db.q.table('suggestions')
			.concatMap(function(doc){
				return doc('tags')
			});
		
		db.send(q, function (res) {
			if (res) {
				all.push(res);
				return true;
			} else {
				return cb(null, all);
			}
		});
	},

	new: function (doc) {
		return _.extend(template, doc, {createdAt: new Date()});
	}

}