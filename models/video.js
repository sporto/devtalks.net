var mongoose = require('mongoose');

var schema = mongoose.Schema({
	approved: Boolean,
	deleted: Boolean,
	url: String,
	description: String,
	tags: Array,
	who: String
});

module.exports = mongoose.model('Video', schema);