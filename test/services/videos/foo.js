var assert = require("assert");
var rewire = require("rewire");
var subject = rewire('../../../services/videos/foo');

// subject.__set__('foo', {bar: 32});
subject.__set__('bar', 2);

describe('foo', function () {

	it('gets foo', function () {
		var res = subject.run();
		assert.equal(res.bar, 2);
	});

});