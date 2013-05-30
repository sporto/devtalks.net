var nconf = require('nconf');
var dbPath = "";
var dbName = "";

switch(process.env.NODE_ENV) {
	case 'production':
		dbPath = nconf.get('DB_PATH_PRO');
		dbName = nconf.get('DB_NAME_PRO');
		break;
	case 'test':
		dbPath = nconf.get('DB_PATH_TEST');
		dbName = nconf.get('DB_NAME_TEST');
	default:
		dbPath = nconf.get('DB_PATH_DEV');
		dbName = nconf.get('DB_NAME_DEV');
}

var nano = require('nano')(dbPath);
var videos = nano.db.use(dbName);

module.exports = videos;

