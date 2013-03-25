desc('This is the default task.');
task('views', {async: true}, function (params) {

	var couchpenter = new (require('couchpenter'))(
		'http://localhost:5984/'
	);

	couchpenter.setUpDocumentsOverwrite(function (err, results) {
		console.log(err);
		console.log(results)
		complete();
	});

	
});
