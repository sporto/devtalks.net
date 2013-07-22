(function (){

	$(document).foundation();
	log.setLevel('trace');

	var app = angular.module('APP', ['ngResource']);

	app.factory('logger', function () {
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
	});
	
	app.service('notifyUserService', function() {
		this.flashError = function (msg) {
			toastr.error(msg);
		}
		this.flashSuccess = function (msg) {
			toastr.success(msg);
		}
	});

	app.factory('Video', ['$resource', function($resource) {
		return $resource('/api/v1/videos/:id/:action',
			{id: '@_id'},
			{
				approve: {
					method: 'PATCH',
					params: {action: 'approve'}
				}
			});
	}]);

	app.factory('approveVideoService', [
		'$q',
		'notifyUserService',
		function ($q, notifyUserService) {
			return function (video) {
				video.busy = true;
				var def = $q.defer();
				var pro = def.promise;
				
				video.$approve(function (doc) {
					def.resolve(doc);
				}, function (res) {
					def.reject(res);
				});

				pro
					.then(function () {
						notifyUserService.flashSuccess('Approved');
					}, function (res) {
						notifyUserService.flashError(res.data);
					})
					.always(function () {
						video.busy = true;
					});
				return def.promise;
			}
		}]);

	app.factory('deleteVideoService', [
		'$q',
		'logger',
		'notifyUserService',
		function ($q, logger, notifyUserService) {
			return function (video) {
				if (confirm("Are you sure?")) {
					video.busy = true;
					var def = $q.defer();
					var pro = def.promise;

					video.$delete(function (data) {
						logger.info('delete success');
						def.resolve();
					}, function (res) {
						logger.info('delete fail');
						def.reject(res);
					});

					pro
					.then(function () {

					}, function () {
						notifyUserService.flashError(res.data);
					})
					.always(function () {
						video.busy = false;
					});

					return pro;
				}
			}
		}]);

}());