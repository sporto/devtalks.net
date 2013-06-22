var expect = chai.expect;

describe('markAsFavouriteService', function () {

	var $httpBackend = null;
	var video = null
	var apiUrl = null;
	var responseStatusCode = 200;

	beforeEach(module('APP'));

	beforeEach(inject(function ($injector) {
		video = {
			_id: '123',
			favourite: null
		}
		apiUrl = '/api/v1/videos/' + video._id + '/mark_favourite';
		$httpBackend = $injector.get("$httpBackend");
		$httpBackend.when("POST", apiUrl)
			.respond(function(method, url, data, headers){
				return [responseStatusCode, {}];
			});
	}));

	afterEach(function () {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});

	it('should have a markAsFavouriteService', function() {
		//expect(APP.markAsFavouriteService).not.to.equal(null);
	});

	it('calls http', inject(['markAsFavouriteService', function (serv) {
		$httpBackend.expectPOST(apiUrl);
		serv(video, true);
		$httpBackend.flush();
	}]));

	it('marks the video as favourite on success', inject(['markAsFavouriteService', function (serv) {
		var pro = serv(video, true);
		var res = null;
		
		pro.success(function (response) {
			// console.log('expect')
			res = true;
			expect(video.favourite).to.equal(true);
		});

		$httpBackend.flush();

		expect(res).to.equal(true);
	}]));

	it('doesnt mark the video as favourite on error', inject(['markAsFavouriteService', function (serv) {

		responseStatusCode = 500;

		var res = null;
		var pro = serv(video, true);
		
		pro
			.success(function () {
				console.log('Should not call this');
			})
			.error(function (response) {
				res = false;
				expect(video.favourite).to.equal(null);
			});

		$httpBackend.flush();

		expect(res).to.equal(false);
	}]));

	it('notifies the user on error', inject(['markAsFavouriteService', function (serv) {

	}]));
});