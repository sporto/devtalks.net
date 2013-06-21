var assert =    require("assert");
var rewire =    require("rewire");
var serv =      rewire('../../../services/authorisations/check');

serv.__set__("ADMIN_USERS", 'sam');

var user = {
	username: 'sam'
}
var resource = 'video';
var action = 'manage';

describe('check', function() {

	it('is true', function (done) {
		serv.run(user, resource, action, function (err, res) {
			assert(res);
			done();
		});
	});

	it('is false for a not admin', function (done) {
		user.username = 'xyz';
		serv.run(user, resource, action, function (err, res) {
			assert(!res);
			done();
		});
	});

	it('is false for a dif action', function (done) {
		serv.run(user, resource, 'update', function (err, res) {
			assert(!res);
			done();
		});
	});

});