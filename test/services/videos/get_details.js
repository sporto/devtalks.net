var assert = require("assert");
var rewire = require("rewire");
var sinon = require("sinon");
var subject = require('../../../services/videos/get_details');

var fakeYoutube = {
	run: function (id, cb) {
		return cb(null, {provider: 'youtube'});
	}
}
subject._youtube = fakeYoutube;

describe('get_details', function() {

	describe('unknown', function () {
		var url = "http://www.xxexxx.com/watch?v=wxtFtVfAeeE";

		it('responds with err', function () {
			subject.run(url, function (err, info) {
				assert(err);
			});
		});
	});

	describe('youtube', function() {

		var url = "http://www.youtube.com/watch?v=wxtFtVfAeeE";

		it('it should know it is youtube', function(done) {
			subject.run(url, function (err, info) {
				assert.equal(info.provider, 'youtube');
				done();
			});
		});
	});

	// describe('vimeo', function() {
	// 	var url = "http://vimeo.com/27246366";

	// 	it('it should know it is youtube', function() {
	// 		var res = subject.run(url);
	// 		assert.equal(res.provider, 'vimeo')
	// 	})


	// 	it('it find the video id', function() {
	// 		var res = subject.run(url);
	// 		assert.equal(res.id, '27246366')
	// 	})
	// });

})