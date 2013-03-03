var mongoose = require('mongoose');

var schema = mongoose.Schema({
	approved: Boolean,
	deleted: Boolean,
	url: String,
	title: String,
	description: String,
	tags: Array,
	who: String,
	thumbS: String,
	thumbM: String,
	thumbL: String
});

schema.static('suggestions', function (callback) {
	return this.where('approved', false).or([{'deleted': false}, {'deleted': null}]).exec(callback);
});

module.exports = mongoose.model('Video', schema);