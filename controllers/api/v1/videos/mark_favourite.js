var setFlag = require('./set_flag');

function main(req, res) {
	return setFlag(req, res, 'favourite');
}

module.exports = main;
