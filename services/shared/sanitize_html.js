var sanitize = require('validator').sanitize;

module.exports = {
	run: function (input) {
		return sanitize(input).xss();
	}
}