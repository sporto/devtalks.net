devTalks.net
=================

[![Build Status](https://travis-ci.org/sporto/devtalks.net.png)](https://travis-ci.org/sporto/devtalks.net)

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

Rename `env.template.json` to `env.json` in the root. Fill in the necessary variables.

### Uploading CouchDB views

To upload the CouchDB views run

	jake db:views

For production use
	
	NODE_ENV=production jake db:views

### Trello Board

	https://trello.com/board/videosforgeeks/5120d5d405ac782c6c002f3c

## License

MIT License, see License.

