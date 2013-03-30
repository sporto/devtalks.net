angular.module('APP', ['ngResource']);
angular.module('APP.suggestions', []);
angular.module('APP.videos', []);
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
	})
	.factory('Suggestion', function($resource) {
		return $resource('/api/v1/suggestions/:id/:action', 
			{
				id: '@_id'
			}, 
			{
				approve: {
					method: 'PATCH',
					params: {action: 'approve'}
				}
			});
	});