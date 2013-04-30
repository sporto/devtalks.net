var passport =                require('passport');
var GitHubStrategy =          require('passport-github').Strategy;
var nconf =                   require('nconf');
var GITHUB_CLIENT_ID =        nconf.get('GITHUB_CLIENT_ID');
var GITHUB_CLIENT_SECRET =    nconf.get('GITHUB_CLIENT_SECRET');
var HOST =                    nconf.get('HOST');

var getUserService =          require('../services/users/get');
var findByProviderService =   require('../services/users/find_by_provider');
var createUserService =       require('../services/users/create');

module.exports = function(app) {

	// Passport session setup.
	//   To support persistent login sessions, Passport needs to be able to
	//   serialize users into and deserialize users out of the session.  Typically,
	//   this will be as simple as storing the user ID when serializing, and finding
	//   the user by ID when deserializing.  However, since this example does not
	//   have a database of user records, the complete GitHub profile is serialized
	//   and deserialized.
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		console.log('deserializeUser');
		console.log(id);
		getUserService.run(id, function(err, user) {
			done(err, user);
		});
	});

	// Use the GitHubStrategy within Passport.
	//   Strategies in Passport require a `verify` function, which accept
	//   credentials (in this case, an accessToken, refreshToken, and GitHub
	//   profile), and invoke a callback with a user object.
	passport.use(new GitHubStrategy({
		clientID: GITHUB_CLIENT_ID,
		clientSecret: GITHUB_CLIENT_SECRET,
		callbackURL: HOST + "/auth/github/callback"
	}, function(accessToken, refreshToken, profile, done) {
		// console.log(profile);
		findByProviderService.run('github', profile.id, function(err, user) {
			// console.log(err);
			// console.log(user);
			if(user) {
				return done(err, user);
			}

			var userInfo = {
				username: profile.username,
				provider: 'github',
				providerId: profile.id,
				avatarUrl: profile._json.avatar_url,
				gravatarId: profile._json.gravatar_id
			}

			createUserService.run(userInfo, function(err, user) {
				return done(err, user);
			});

		});
	}));

	// GET /auth/github
	//   Use passport.authenticate() as route middleware to authenticate the
	//   request.  The first step in GitHub authentication will involve redirecting
	//   the user to github.com.  After authorization, GitHubwill redirect the user
	//   back to this application at /auth/github/callback
	app.get('/auth/github', passport.authenticate('github'), function(req, res) {
		// The request will be redirected to GitHub for authentication, so this
		// function will not be called.
	});

	// GET /auth/github/callback
	//   Use passport.authenticate() as route middleware to authenticate the
	//   request.  If authentication fails, the user will be redirected back to the
	//   login page.  Otherwise, the primary route function function will be called,
	//   which, in this example, will redirect the user to the home page.
	app.get('/auth/github/callback', passport.authenticate('github', {
		failureRedirect: '/',
		successRedirect: 'back',
		failureFlash: true,
		successFlash: 'Welcome'}
		));
	// }), function(req, res) {
	// 	console.log('logged in');
	// 	console.log(req.user);
	// 	res.redirect('back');
	// });

	// app.get('/login', function(req, res){
	// 	res.render('sessions/new', { user: req.user });
	// });
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

}