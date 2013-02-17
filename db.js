var dbConfig = require('./config/db');
var r = require('rethinkdb');

module.exports = {
	q: r,
	send: function (query, cb) {
		r.connect(dbConfig, function(conn) {
			conn.use('videos');
			query.run(cb);
			conn.close();
		}, function() {
			throw 'Connect failed';
		});
	}
}