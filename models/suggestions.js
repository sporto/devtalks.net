var db = require('../db');
var _ = require('underscore');

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
	create: function (data, cb) {
		var doc = this.build(data);
		db.insert(doc, function (err, body) {
			return cb(null, body);
		});
	}
}