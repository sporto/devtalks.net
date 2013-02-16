var _ = require('underscore');

var template = {
	kind: 'suggestion'
}

module.exports = {
	new: function (doc) {
		// returns a new suggestion object
		return _.extend(template, doc, {createdAt: new Date()});
	}
}