find_provider = require('../services/videos/find_provider');

var mongoose = require('mongoose');

var schema = mongoose.Schema({
	approved: Boolean,
	deleted: Boolean,
	url: String,
	title: String,
	presenter: String,
	description: String,
	tags: Array,
	thumbS: String,
	thumbM: String,
	thumbL: String
});

schema.static('suggestions', function (callback) {
	return this.where('approved', false).or([{'deleted': false}, {'deleted': null}]).exec(callback);
});

schema.virtual('provider').get(function () {
	return find_provider.run(this.url).provider;
});
schema.virtual('providerId').get(function () {
	return find_provider.run(this.url).id;
});

module.exports = mongoose.model('Video', schema);