var _ = require('underscore');

var template = {
	kind: 'tag'
}

module.exports = {
	
	all: function(cb) {
		cb(null, ['1','2','3']);
	},

	new: function (doc) {
		return _.extend(template, doc, {createdAt: new Date()});
	}

}