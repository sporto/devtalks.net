var setFlag = require('./set_flag');

function main(req, res) {
	return setFlag(req, res, 'seen');
}

module.exports = main;
