var nconf = require('nconf');
var dbPath = "";
var dbName = "";

if (process.env.NODE_ENV == 'production') {
	dbPath = nconf.get('DB_PATH_PRO');
	dbName = nconf.get('DB_NAME_PRO');
} else {
	dbPath = nconf.get('DB_PATH_DEV');
	dbName = nconf.get('DB_NAME_DEV');
}

var nano = require('nano')(dbPath);
var videos = nano.db.use(dbName);

module.exports = videos;

