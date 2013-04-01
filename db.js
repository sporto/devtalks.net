var nconf = require('nconf');
var dbPath = "";

if (process.env.NODE_ENV == 'production') {
	dbPath = nconf.get('DB_PATH_PRO');
} else {
	dbPath = nconf.get('DB_PATH_DEV');
}
var nano = require('nano')(dbPath);
var videos = nano.db.use('videos')

module.exports = videos;

