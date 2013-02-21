module.exports = function (app) {

	var controllers = require('./controllers/web');
	var urls = require('./controllers/web/urls')

	app.get('/', controllers.index);
	app.get('/urls', urls.show);
	app.resource('suggestions', require('./controllers/web/suggestions'));
	app.resource('tags', require('./controllers/web/tags'));

	app.namespace('/api/v1', function(){
		app.resource('suggestions', require('./controllers/api/v1/suggestions'));
		app.resource('tags', require('./controllers/api/v1/tags'));
	});

	// app.get('/users', user.list);
}

