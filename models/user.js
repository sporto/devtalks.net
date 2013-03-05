var mongoose = require('mongoose');

var schema = mongoose.Schema({
	deleted: Boolean,
	username: String,
	name: String,
	githubId: String,
	avatarUrl: String,
	gravatarId: String
});

module.exports = mongoose.model('User', schema);