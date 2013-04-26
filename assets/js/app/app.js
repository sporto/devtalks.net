$(document).foundation();

angular.module('APP', ['ngResource'])
	.service('notifyUserService', function() {
		this.flashError = function (msg) {
			toastr.error(msg);
		}
		this.flashSuccess = function (msg) {
			toastr.success(msg);
		}
	})
	.factory('Video', ['$resource', function($resource) {
		return $resource('/api/v1/videos/:id/:action',
			{id: '@_id'},
			{
				approve: {
					method: 'PATCH',
					params: {action: 'approve'}
				}
			});
	}]);