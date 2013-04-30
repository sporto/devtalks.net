var assert =    require("assert");
var rewire =    require("rewire");
var sinon =     require("sinon");
var subject =   rewire('../../../services/videos/get_details');

var url = "http://vimeo.com/27246366";

var fakeService = {
	fetch: function (url, cb) {
		cb(null, {});
	}
}

subject.__set__("service", fakeService);

describe('get_details', function() {

	it('asks the service', function (done) {
		sinon.spy(fakeService, "fetch");

		subject.run(url, function (err, info) {
			assert(fakeService.fetch.calledOnce);
			done();
			fakeService.fetch.restore(); // Unwraps the spy
		});
		
	});

})