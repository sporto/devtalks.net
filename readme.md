devTalks.net
=================

This is the source code for [devtalks.net](http://devtalks.net). A site for discovering and watching the best programming videos and tutorials.

## Technology Stack

DevTalks.net is build using:

- Node.js
- Express.js
- Angular.js
- jQuery
- CouchDB
- Zurb Foundation CSS

## Setting up development environment

### Global node modules

The following node modules should be installed globally

- jake

### env.json

Create a file called `env.json` in the root. This file should look like this:

	{
		"HOST": "http://localhost:3000",
		"DB_PATH_DEV": "http://localhost:5984",
		"DB_PATH_PRO": "https://path-to-couch-db:1234/",
		"DB_NAME_DEV": "db-name",
		"DB_NAME_PRO" "db-name",
		"ADMIN_USERS": "username",
		"GITHUB_CLIENT_ID": "you-github-client-id",
		"GITHUB_CLIENT_SECRET": "your-github-client-secret",
		"ROLLBAR_ACCESS_TOKEN": "your-rollbar-access-token"
	}

### Uploading CouchDB views

To upload the CouchDB views run

	jake db:views

For production use
	
	NODE_ENV=production jake db:views

### Trello Board

	https://trello.com/board/videosforgeeks/5120d5d405ac782c6c002f3c

## License

MIT License, see License.

