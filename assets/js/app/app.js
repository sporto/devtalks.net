angular.module('ANG', []);
angular.module('ANG.suggestions', []);
angular.module('ANG.admin', []);
angular.module('ANG.admin.suggestions', []);

angular.module('ANG')
	.service('flashService', function($rootScope) {
		return {
			flashError: function (msg) {
				toastr.error(msg);
			},
			flashSuccess: function (msg) {
				toastr.success(msg);
			}
		}
	});

angular.module('ANG')
	.controller('AppCtrl', function ($scope) {
		$scope.$on('flashError', function () {
			console.log('flashError');
		})
	});

(function () {

	Namespacer('APP');

	APP = {
		flashError: function (msg) {
			toastr.error(msg);
		},
		flashSuccess: function (msg) {
			toastr.success(msg);
		}
	}

}());