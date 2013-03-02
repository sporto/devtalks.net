angular.module('APP', []);
angular.module('APP.suggestions', []);
angular.module('APP.admin', []);
angular.module('APP.admin.suggestions', []);

angular.module('APP')
	.service('notifyUserService', function() {
		this.flashError = function (msg) {
			toastr.error(msg);
		}
		this.flashSuccess = function (msg) {
			toastr.success(msg);
		}
	});

angular.module('APP.models', ['ngResource'])
	.factory('suggestions', function($resource) {
			return $resource('/api/v1/suggestions');
		})
