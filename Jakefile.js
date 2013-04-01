var nconf = require('nconf');

desc('This is the default task.');
task('views', {async: true}, function (params) {

	nconf.use('memory').env().file({file: './env.json'});

	var dbPath = "";
	if (process.env.NODE_ENV == 'production') {
		dbPath = nconf.get('DB_PATH_PRO');
	} else {
		dbPath = nconf.get('DB_PATH_DEV');
	}

	var couchpenter = new (require('couchpenter'))(dbPath);

	couchpenter.setUpDocumentsOverwrite(function (err, results) {
		console.log(err);
		console.log(results)
		complete();
	});

	
});
