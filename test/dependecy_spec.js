var subject = require('./dependecy');
var assert = require("assert");
var sinon = require('sinon');
var sandbox = sinon.sandbox;

// var stub = sinon.stub(subject, '_dependency1')

var fakeVimeo = {
			run: function () {
				return 'Fake vimeo'
			}
		}

describe('dependecy', function() {

	it('runs', sinon.test(function () {
		this.stub(subject, '_vimeo', fakeVimeo)

		var res = subject.run();
		assert.equal(res, 'Fake vimeo');
	}));

	it('expects the default', function () {

		var res = subject.run();
		assert.equal(res, 'vimeo');
	});
	

})