// var dbConfig = require('./config/db');
// var r = require('rethinkdb');

// module.exports = {
// 	q: r,
// 	send: function (query, cb) {
// 		r.connect(dbConfig, function(conn) {
// 			conn.use('videos');
// 			query.run(cb);
// 			conn.close();
// 		}, function() {
// 			throw 'Connect failed';
// 		});
// 	}
// }

var mongoose = require('mongoose');

module.exports = {

	connect: function () {
		mongoose.connect('mongodb://localhost/videos');

		var db = mongoose.connection;
		db.on('error', console.error.bind(console, 'connection error:'));
		db.once('open', function callback () {
		  // yay!
		  console.log('CONNECTED');
		});
	}
}

// COUCH

// var nano = require('nano')('http://localhost:5984');
// var videos = nano.db.use('videos')

// module.exports = videos;

