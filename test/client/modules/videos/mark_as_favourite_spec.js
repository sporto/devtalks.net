var expect = chai.expect;

describe('markAsFavouriteService', function () {

	// console.log(angular.module('APP'))
	var $httpBackend;

	// var APP;
	var video = {
		_id: '123'
	}

	var apiUrl = '/api/v1/videos/' + video._id + '/mark_favourite';

	beforeEach(module('APP'));

	beforeEach(inject(function ($injector) {
		$httpBackend = $injector.get("$httpBackend");
		$httpBackend.when("POST", apiUrl)
			.respond(200, {value:"goodValue"});
	}));

	afterEach(function () {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});

	// beforeEach(angular.mock.module('APP'));
	// beforeEach(function () {APP = angular.module('APP')});
	// beforeEach(inject(function (service, _$httpBackend_) {
	// 	service = MyService;
	// 	$httpBackend = _$httpBackend_;
	// }));

	it('should have a markAsFavouriteService', function() {
		//expect(APP.markAsFavouriteService).not.to.equal(null);
	});

	it('calls http', inject(['markAsFavouriteService', function (serv) {
		$httpBackend.expectPOST(apiUrl);
		serv(video, true);
		$httpBackend.flush();
	}]));

	it('marks the video as favourite on success', inject(['markAsFavouriteService', function (serv) {
		// console.log(serv);
		// console.log('running');
		// var pro = serv(video, true);
		// console.log('promise', pro);
		// console.log(pro.success);

		// pro.success(function (response) {
		// 	console.log('response back')
		// 	expect(video.favourite).to.equal(true);
		// 	$httpBackend.flush();
		// });
	}]));

	it('doesnt mark the video as favourite on success', inject(['markAsFavouriteService', function (serv) {

	}]));

	it('notifies the user on error', inject(['markAsFavouriteService', function (serv) {

	}]));
});