var youtube = require('youtube-feeds')

function run(id, cb) {
	// console.log(id);
	return youtube.video(id, cb);
	// var res = {
	// 	info: {
	// 		description: 'HELLO ' + url
	// 	}
	// }
	// return cb(null, res);
}

module.exports = {
	run: run
};