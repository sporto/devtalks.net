//https://github.com/visionmedia/express-resource

var checkAuthServ = require('./services/authorisations/check');

function csrf(req, res, next) {
	res.locals.token = req.session._csrf;
	next();
}

function setViewVars(req, res, next) {
	console.log('setViewVars');

	res.locals.allowAdmin = false;
	res.locals.user = req.user;

	if (req.user) {
		checkAuthServ.run(req.user, 'suggestion', 'manage', function (err, val) {
			console.log(err);
			res.locals.allowAdmin = val;
			return next();
		});
	} else {
		console.log('No user');
		return next();
	}
}

module.exports = function (app) {

	var controllers = require('./controllers/web');

	app.get('/', setViewVars, setViewVars, require('./controllers/web/videos').index);
	app.get('/videos', setViewVars, require('./controllers/web/videos').index);
	app.get('/videos/:video', setViewVars, require('./controllers/web/videos').show);
	app.get('/suggestions/new', csrf, setViewVars, require('./controllers/web/suggestions').new);

	app.namespace('/api/v1', function(){
		var videos =				require('./controllers/api/v1/videos');
		var suggestions =		require('./controllers/api/v1/suggestions');
		var tags =					require('./controllers/api/v1/tags');
		var urls =					require('./controllers/api/v1/urls');
		
		app.resource('videos', videos);
		app.get('/videos/search', videos.search);
		app.post('/videos/:video/mark_seen', videos.mark_seen);

		app.get('/suggestions', suggestions.index);
		app.post('/suggestions', suggestions.create);
		app.patch('/suggestions/:suggestion/approve', suggestions.approve);

		app.resource('tags', tags);
		
		app.get('/urls', urls.show);
	});

	app.namespace('/admin', function() {
		app.get('/suggestions', setViewVars, require('./controllers/web/admin/suggestions').index);
	});

}

