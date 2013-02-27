var video = require('n-vimeo').video;

function run(id, cb) {
	// return video(id, cb);
	// return cb(null, res);
	return video(id, function(err, data){
		if (err) return cb(err);
	  // Here the API expose three new objects: raw, thumb, username

	  var info = {
	  	title: data.raw.title,
	  	description: data.raw.description,
	  	thumbS: data.thumb.s,
	  	thumbM: data.thumb.m,
	  	thumbL: data.thumb.l
	  }
	  return cb(null, info);
	});
}

module.exports = {
	run: run
};