module.exports = function (app) {

	var controllers = require('./controllers');
	var urls = require('./controllers/urls')

	app.get('/', controllers.index);
	app.get('/urls', urls.show);
	app.resource('suggestions', require('./controllers/suggestions'));
	app.resource('tags', require('./controllers/tags'));

	// app.get('/users', user.list);
}

