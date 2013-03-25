var findProviderService = require('videoinfo');
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
	return findProviderService.findProvider(this.url);
});
schema.virtual('providerId').get(function () {
	return findProviderService.findProvider(this.url);
});

module.exports = mongoose.model('Video', schema);