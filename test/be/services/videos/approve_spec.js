require('../../../../load_config')();

var assert =    require("assert");
var rewire =    require("rewire");
var sinon =     require("sinon");
var subject =   rewire('../../../../services/videos/approve');


// var fakeDb = {};

// subject.__set__("db", fakeDb);

describe('approve', function() {

	it('returns an error if no id provided', function() {
		subject.run(null, function (err) {
			assert(err);
		});
	});

	// it('asks the service', function (done) {
	// 	sinon.spy(fakeService, "fetch");

	// 	subject.run(url, function (err, info) {
	// 		assert(fakeService.fetch.calledOnce);
	// 		done();
	// 		fakeService.fetch.restore(); // Unwraps the spy
	// 	});
		
	// });

})