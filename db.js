var nano = require('nano')('http://localhost:5984');
var videos = nano.db.use('videos')

module.exports = videos;

