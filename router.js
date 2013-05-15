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

	checkAuthServ.run(req.user, 'video', 'manage', function (err, val) {
		res.locals.allowAdmin = val;
		return next();
	});
}

module.exports = function (app) {

	app.get('/', setViewVars, require('./controllers/web/videos').index);
	app.get('/about', setViewVars, require('./controllers/web/pages').about);
	
	app.get('/videos', setViewVars, require('./controllers/web/videos').index);
	app.get('/videos/new', csrf, setViewVars, require('./controllers/web/videos').new);
	app.get('/videos/:video', setViewVars, require('./controllers/web/videos').show);
	app.get('/videos/:video/edit', csrf, setViewVars, require('./controllers/web/videos').edit);

	app.namespace('/api/v1', function(){
		var videos =        require('./controllers/api/v1/videos');
		var tags =          require('./controllers/api/v1/tags');
		var urls =          require('./controllers/api/v1/urls');
		
		app.get('/videos/search', videos.search);
		app.get('/videos/latest', videos.latest);
		app.post('/videos/:video/mark_seen', videos.mark_seen);
		app.post('/videos/:video/mark_favourite', videos.mark_favourite);
		app.post('/videos', csrf, videos.create); // create new video (suggestion)
		app.post('/videos/:video', csrf, videos.update); // update video
		app.patch('/videos/:video/approve', videos.approve);

		app.resource('tags', tags);
		
		app.get('/urls', urls.show);
	});

	app.namespace('/admin', function() {
		app.get('/suggestions', setViewVars, require('./controllers/web/admin/suggestions').index);
	});
}

