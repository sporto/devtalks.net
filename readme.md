devTalks.net
=================

A site for discovering and watching the best programming videos and tutorials.

## Setting up development environment

### Global node modules

The following node modules should be installed globally

- jake

### env.json

Create a file called `env.json` in the root. This file should look like this:

	{
		"ENV": "development",
		"GITHUB_CLIENT_ID": "you-github-client-id",
		"GITHUB_CLIENT_SECRET": "your-github-client-secret",
		"ROLLBAR_ACCESS_TOKEN": "your-rollbar-access-token"
	}

### Uploading CouchDB views

To upload the CouchDB views run

	jake views

### Trello Board

	https://trello.com/board/videosforgeeks/5120d5d405ac782c6c002f3c

## License

MIT License, see License.

