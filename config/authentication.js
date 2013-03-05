var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var nconf = require('nconf');
var GITHUB_CLIENT_ID = nconf.get('GITHUB_CLIENT_ID');
var GITHUB_CLIENT_SECRET = nconf.get('GITHUB_CLIENT_SECRET');
var User = require('../models/user');

module.exports = function (app) {

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
		// console.log('deserializeUser');
		User.findById(id, function (err, user) {
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
			callbackURL: "http://127.0.0.1:3000/auth/github/callback"
	  },
		function(accessToken, refreshToken, profile, done) {
			// console.log(profile);

	    User.findOne({ githubId: profile.id }, function (err, user) {
	    	// console.log(err);
	    	// console.log(user);
	    	var userInfo = {
	    		username: profile.username,
	    		githubId: profile.id,
	    		avatarUrl: profile._json.avatar_url,
	    		gravatarId: profile._json.gravatar_id
	    	}

	    	if (user) {
	    		return done(err, user);
	    	}
	    	User.create(userInfo, function (err, user) {
					return done(err, user);
	    	});
	    });
	  }
	));

	// GET /auth/github
	//   Use passport.authenticate() as route middleware to authenticate the
	//   request.  The first step in GitHub authentication will involve redirecting
	//   the user to github.com.  After authorization, GitHubwill redirect the user
	//   back to this application at /auth/github/callback
	app.get('/auth/github',
		passport.authenticate('github'),
		function(req, res){
		  // The request will be redirected to GitHub for authentication, so this
		  // function will not be called.
		});

	// GET /auth/github/callback
	//   Use passport.authenticate() as route middleware to authenticate the
	//   request.  If authentication fails, the user will be redirected back to the
	//   login page.  Otherwise, the primary route function function will be called,
	//   which, in this example, will redirect the user to the home page.
	app.get('/auth/github/callback', 
		passport.authenticate('github', { failureRedirect: '/login' }),
		function(req, res) {
			res.redirect('/');
		});

	// app.get('/login', function(req, res){
	// 	res.render('sessions/new', { user: req.user });
	// });

	app.get('/logout', function(req, res){
	  req.logout();
	  res.redirect('/');
	});

}