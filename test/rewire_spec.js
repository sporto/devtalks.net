var assert = require("assert");
var rewire = require("rewire");
var subject = rewire('./dependant');

subject.__set__('bar', 2);

describe('foo', function () {

	// :)
	it('getBar', function () {
		var bar = subject.getBar();
		assert.equal(bar, 2);
	});

	// :(
	it('getFoo', function () {
		var foo = subject.getFoo();
		assert.equal(foo.bar, 2);
	});

});