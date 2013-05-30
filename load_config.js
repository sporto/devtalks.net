var nconf       = require('nconf');

module.exports = function () {
	//load env variables
	nconf.use('memory').env().file({file: './env.json'});
}


