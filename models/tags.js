var db = require('../db.js');
var _ = require('underscore');
var when = require('when');

var template = {
	kind: 'tag'
}

module.exports = {
	
	all: function() {
		var deferred = when.defer();

		var q = db.q.table('suggestions').concatMap(function(doc){
			return doc('tags')
		}).distinct();

		var all = [];
		
		db.send(q, function (res) {
			if (res) {
				all.push(res);
				return true;
			} else {
				//return cb(null, all);
				//console.log(all);
				deferred.resolve(all);
				return false;
			}
		});

		return deferred.promise;
	},

	raw: function () {
		var deferred = when.defer();

		var all = [];

		var q = db.q.table('suggestions')
			.concatMap(function(doc){
				return doc('tags')
			});
			// .reduce({}, function(act, val) {
			// 	act[val] = act[val] || 0
			// 	act[val] += 1
			// 	return act;
			// });
		
		db.send(q, function (res) {
			if (res) {
				all.push(res);
				return true;
			} else {
				//return cb(null, all);
				//console.log(all);
				deferred.resolve(all);
				return false;
			}
		});

		return deferred.promise;
	},

	new: function (doc) {
		return _.extend(template, doc, {createdAt: new Date()});
	}

}