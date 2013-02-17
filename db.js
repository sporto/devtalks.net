var dbConfig = require('./config/db');
var r = require('rethinkdb');

module.exports = function (query, cb) {
		r.connect(dbConfig, function(conn) {
			conn.use('videos');
			query.run(cb);
		}, function() {
			throw 'Connect failed';
		});
	}