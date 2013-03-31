/**
 * Module dependencies.
 */

var express = require('express');
var engine = require('ejs-locals');
var http = require('http');
var path = require('path');
var db = require('./db');
var passport = require('passport');
var nconf = require('nconf');
var flash = require('connect-flash');
var rollbar = require('rollbar');
var sanitizeHtmlServ = require('./services/shared/sanitize_html');

require('express-resource');
require('express-namespace');

//load env variables
nconf.use('memory').env().file({file: './env.json'});

// register uncaught error handler
rollbar.handleUncaughtExceptions(nconf.get('ROLLBAR_ACCESS_TOKEN'));

var app = express();

// use ejs-locals for all ejs templates:
app.engine('ejs', engine);

app.configure(function() {
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser('I like you'));
	app.use(express.session());
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
});

app.configure('development', function() {
	app.use(express.errorHandler());
});

require('./config/authentication')(app);

require('./router')(app);

app.locals({
	env: nconf.get('ENV'),
	title: 'devTalks',
	uid: require('shortid'),
	sanitizeHtml: sanitizeHtmlServ.run
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