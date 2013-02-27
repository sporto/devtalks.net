var mongoose = require('mongoose');

var schema = mongoose.Schema({
	approved: Boolean,
	deleted: Boolean,
	url: String,
	title: String,
	description: String,
	tags: Array,
	who: String,
	thumbs: Object
});

module.exports = mongoose.model('Video', schema);