var assert = require("assert");
var rewire = require("rewire");
var subject = rewire('./dependant');

subject.__set__('bar', {b: 3});

describe('foo', function () {

	// :)
	it('getBar', function () {
		var bar = subject.getBar();
		assert.equal(bar, {b: 3});
	});

	// :(
	it('getFoo', function () {
		var foo = subject.getFoo();
		assert.equal(foo.bar, {b: 3});
	});

});