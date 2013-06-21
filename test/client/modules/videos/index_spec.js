var expect = chai.expect;

describe('videos.IndexCtrl', function () {

	// console.log(angular.module('APP'))

	var APP;

	beforeEach(angular.mock.module('APP'));
	beforeEach(function () {APP = angular.module('APP')});

	it('should have a videos.IndexCtrl controller', function() {
		expect(APP['videos.IndexCtrl']).not.to.equal(null);
	});

	/*
	beforeEach(angular.mock.module('APP'));

	beforeEach(inject(function($rootScope, $controller) {
			$scope = $rootScope.$new();
			IndexCtrl = $controller('videos.IndexCtrl', {$scope: $scope});
	}));

	it('test something', function () {
		// expect(, 'what kind of tea do we want?');
		expect($scope.videos.length).toBe(0);
	});

	*/
});