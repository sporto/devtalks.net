$(document).foundation();
log.setLevel('trace');

angular.module('APP', ['ngResource'])

	.factory('logger', function () {
		return {
			trace: function (msg) {
				log.trace(msg);
			},
			debug: function (msg) {
				log.debug(msg);
			},
			info: function (msg) {
				log.info(msg);
			},
			warn: function (msg) {
				log.warn(msg);
			},
			error: function (msg) {
				log.error(msg);
			}
		}
	})
	
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