var mongoose = require('mongoose');

var schema = mongoose.Schema({
	url: String,
	description: String,
	tags: Array,
	who: String
});

module.exports = mongoose.model('Suggestion', schema);