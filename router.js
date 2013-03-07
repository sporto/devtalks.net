//https://github.com/visionmedia/express-resource

module.exports = function (app) {

	var controllers = require('./controllers/web');

	app.get('/', controllers.index);
	app.resource('videos', require('./controllers/web/videos'));
	app.resource('suggestions', require('./controllers/web/suggestions'));
	app.resource('tags', require('./controllers/web/tags'));

	app.namespace('/api/v1', function(){
		var suggestions = require('./controllers/api/v1/suggestions');
		var tags = require('./controllers/api/v1/tags');
		var urls = require('./controllers/api/v1/urls')
		
		app.resource('suggestions', suggestions);
		app.patch('/suggestions/:suggestion/approve', suggestions.approve);
		app.resource('tags', tags);
		app.get('/tags/:tag/videos', tags.videos);
		app.get('/tags/search', tags.search);
		app.get('/urls', urls.show);
	});

	app.namespace('/admin', function() {
		app.resource('suggestions', require('./controllers/web/admin/suggestions'));
	});

	// app.get('/users', user.list);
}

