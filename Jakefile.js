desc('This is the default task.');
task('default', function (params) {
  console.log('This is the default task.');
});


desc('This is the default task.');
task('views', {async: true}, function (params) {

	var couchpenter = new (require('couchpenter'))(
		'http://localhost:5984/'
	);

	couchpenter.setUpDocumentsOverwrite(function (err, results) {
		console.log(err);
		console.log(results)
		console.log('Done');
		complete();
	});

	
});
