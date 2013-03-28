//https://github.com/visionmedia/express-resource

var checkAuthServ = require('./services/authorisations/check');

module.exports = function (app) {

	function setViewVars(req, res, next) {
		checkAuthServ.run(req.user, 'suggestion', 'manage', function (err, val) {
			app.locals({allowAdmin: val, user: req.user});
			return next();
		});
	}


	var controllers = require('./controllers/web');

	app.get('/', setViewVars, controllers.index);
	app.resource('videos', setViewVars, require('./controllers/web/videos'));
	app.resource('suggestions', setViewVars, require('./controllers/web/suggestions'));

	app.namespace('/api/v1', function(){
		var videos =				require('./controllers/api/v1/videos');
		var suggestions =		require('./controllers/api/v1/suggestions');
		var tags =					require('./controllers/api/v1/tags');
		var urls =					require('./controllers/api/v1/urls');
		
		app.resource('videos', videos);
		app.get('/videos/search', videos.search);
		app.post('/videos/:video/mark_seen', videos.mark_seen);

		app.resource('suggestions', suggestions);
		app.patch('/suggestions/:suggestion/approve', suggestions.approve);

		app.resource('tags', tags);
		
		app.get('/urls', urls.show);
	});

	app.namespace('/admin', function() {
		app.resource('suggestions', require('./controllers/web/admin/suggestions'));
	});

}

