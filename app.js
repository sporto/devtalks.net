/**
 * Module dependencies.
 */

var express              = require('express');
var engine               = require('ejs-locals');
var http                 = require('http');
var path                 = require('path');
var passport             = require('passport');
var RedisStore           = require('connect-redis')(express);
var nconf                = require('nconf');
var flash                = require('connect-flash');
var rollbar              = require('rollbar');
var sanitizeHtmlServ     = require('./services/shared/sanitize_html');

require('express-resource');
require('express-namespace');

require('./load_config')();

var redisHost            = nconf.get('REDIS_HOST');
var redisPort            = nconf.get('REDIS_PORT');
var redisPass            = nconf.get('REDIS_PASSWORD');
var redisStore           = new RedisStore({host: redisHost, port: redisPort, pass: redisPass});

// register uncaught error handler
var rollbarToken = nconf.get('ROLLBAR_ACCESS_TOKEN');
rollbar.handleUncaughtExceptions(rollbarToken);

var app = express();

// use ejs-locals for all ejs templates:
app.engine('ejs', engine);

app.configure(function() {
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');
	app.use(express.favicon(__dirname + '/public/img/app/favicon.ico')); 
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser('I like you'));
	// app.use(express.session());
	app.use(express.session({secret: 'amazing yes', store: redisStore}));
	app.use(flash());
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(app.router);
	app.use(require('connect-assets')());
	app.use(express.csrf());
	app.use(rollbar.errorHandler());	// Make sure this line is below the app.router line
	app.use(require('less-middleware')({
		src: __dirname + '/public'
	}));
	app.use(express.static(path.join(__dirname, 'public')));
	app.use(function(req, res) {
		res.render('pages/404', {title: '404: File Not Found'});
	});
	// Handle 500
	app.use(function(error, req, res, next) {
		res.render('pages/500', {title:'500: Internal Server Error', error: error});
	});
});

app.configure('development', function() {
	app.use(express.errorHandler());
});

require('./config/authentication')(app);

require('./router')(app);

app.locals({
	env:           process.env.NODE_ENV,
	title:         'devTalks',
	uid:           require('shortid'),
	sanitizeHtml:  sanitizeHtmlServ.run,
	allowAdmin:    false,
	user:          null
});

http.createServer(app).listen(app.get('port'), function() {
	console.log("Express server listening on port " + app.get('port'));
});

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) { return next(); }
	res.redirect('/login');
}