/**
 * Module dependencies.
 */

var express = require('express');
var engine = require('ejs-locals');
var http = require('http');
var path = require('path');;
require('express-resource');

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
	app.use(express.cookieParser('your secret here'));
	app.use(express.session());
	app.use(app.router);
	app.use(require('less-middleware')({
		src: __dirname + '/public'
	}));
	app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function() {
	app.use(express.errorHandler());
});

require('./router')(app);

app.locals.title = 'Super App';
app.locals.uid = require('shortid');

http.createServer(app).listen(app.get('port'), function() {
	console.log("Express server listening on port " + app.get('port'));
});