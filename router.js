//https://github.com/visionmedia/express-resource

module.exports = function (app) {

	var controllers = require('./controllers/web');
	var urls = require('./controllers/web/urls')

	app.get('/', controllers.index);
	app.get('/urls', urls.show);
	app.resource('suggestions', require('./controllers/web/suggestions'));
	app.resource('tags', require('./controllers/web/tags'));

	app.namespace('/api/v1', function(){
		var suggestions = require('./controllers/api/v1/suggestions');
		
		app.resource('suggestions', suggestions);
		app.get('/suggestions/:id/approve', suggestions.approve);
		app.resource('tags', require('./controllers/api/v1/tags'));
	});

	app.namespace('/admin', function() {
		app.resource('suggestions', require('./controllers/web/admin/suggestions'));
	});

	// app.get('/users', user.list);
}

