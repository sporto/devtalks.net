var assert = require("assert")
var subject = require('../../../services/videos/find_provider')

describe('find_provider', function() {

	describe('youtube', function() {
		var url = "http://www.youtube.com/watch?v=wxtFtVfAeeE";

		it('it should know it is youtube', function() {
			var res = subject.run(url);
			assert.equal(res.provider, 'youtube')
		})


		it('it find the video id', function() {
			var res = subject.run(url);
			assert.equal(res.id, 'wxtFtVfAeeE')
		})
	});

	describe('vimeo', function() {
		var url = "http://vimeo.com/27246366";

		it('it should know it is youtube', function() {
			var res = subject.run(url);
			assert.equal(res.provider, 'vimeo')
		})


		it('it find the video id', function() {
			var res = subject.run(url);
			assert.equal(res.id, '27246366')
		})
	});

})