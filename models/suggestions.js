var db = require('../db.js');
var _ = require('underscore');
var when = require('when');

var template = {
	kind: 'suggestion'
}

module.exports = {
	//build an instance
	//add the template into it
	build: function (doc) {
		return _.extend(template, doc, {createdAt: new Date()});
	},

	//save a complete object to the db
	create: function (data) {
		var deferred = when.defer();

		var doc = this.build(data);
		var q = db.q.table('suggestions').insert(doc);

		db.send(q, function(doc) {
			return deferred.resolve(doc);
		});

		return deferred;
	}
}