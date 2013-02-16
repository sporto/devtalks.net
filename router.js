
module.exports = function (app) {

	var controllers = require('./controllers');

	app.get('/', controllers.index);
	app.resource('suggestions', require('./controllers/suggestions'));

	// app.get('/users', user.list);
}

