var winston = require('winston');

var logger = new winston.Logger({
	transports: [
		new (winston.transports.Console)({timestamp: true}),
		new (winston.transports.File)({ filename: __dirname + '/debug.log' })
	]
});

module.exports = logger;