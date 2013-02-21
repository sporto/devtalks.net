var db = require('../db.js');
var _ = require('underscore');
var when = require('when');
// var mongoose = require('mongoose');

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
		console.log('suggestion model - create')

		var doc = this.build(data);
		// var q = db.q.table('suggestions').insert(doc);

		db.insert(doc, cb);

		// function done(doc) {
		// 	console.log('create - done')
		// 	console.log(doc)
		// 	// the db returns undefined a second time
		// 	if (doc) {
		// 		return cb(null, doc);
		// 	}
		// }

		// db.send(q, done);

	}
}