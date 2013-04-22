// Sample Karma configuration file, that contain pretty much all the available options
// It's used for running client tests on Travis (http://travis-ci.org/#!/karma-runner/karma)
// Most of the options can be overriden by cli arguments (see karma --help)
//
// For all available config options and default values, see:
// https://github.com/karma-runner/karma/blob/stable/lib/config.js#L54


// base path, that will be used to resolve files and exclude
basePath = '';

frameworks = ['mocha'];

// list of files / patterns to load in the browser
files = [
	// Adapter
	JASMINE,
	JASMINE_ADAPTER,
	'node_modules/chai/chai.js',
	'assets/js/lib/jquery.js',
	'assets/js/lib/angular.min.js',
	'assets/js/lib/**/*.js',
	'test/angular-mocks.js',
	'assets/js/lib/foundation.min.js',
	'assets/js/app/**/*.js',
	//'test/client/mocks.js',
	// 'static/karma.src.js',
	'test/client/**/*_spec.js'
];

// list of files to exclude
exclude = [];

// use dots reporter, as travis terminal does not support escaping sequences
// possible values: 'dots', 'progress', 'junit', 'teamcity'
// CLI --reporters progress
reporters = ['progress', 'junit'];

junitReporter = {
  // will be resolved to basePath (in the same way as files/exclude patterns)
  outputFile: 'test-results.xml'
};

// web server port
// CLI --port 9876
port = 9876;

// cli runner port
// CLI --runner-port 9100
runnerPort = 9100;

// enable / disable colors in the output (reporters and logs)
// CLI --colors --no-colors
colors = true;

// level of logging
// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
// CLI --log-level debug
logLevel = LOG_INFO;

// enable / disable watching file and executing tests whenever any file changes
// CLI --auto-watch --no-auto-watch
autoWatch = true;

// Start these browsers, currently available:
// - Chrome
// - ChromeCanary
// - Firefox
// - Opera
// - Safari (only Mac)
// - PhantomJS
// - IE (only Windows)
// CLI --browsers Chrome,Firefox,Safari
browsers = ['Firefox'];

// If browser does not capture in given timeout [ms], kill it
// CLI --capture-timeout 5000
captureTimeout = 5000;

// Auto run tests on start (when browsers are captured) and exit
// CLI --single-run --no-single-run
singleRun = false;

// report which specs are slower than 500ms
// CLI --report-slower-than 500
reportSlowerThan = 500;

// compile coffee scripts
preprocessors = {
	//'**/*.coffee': 'coffee'
};

plugins = [
	//'karma-jasmine',
	'karma-chrome-launcher',
	'karma-firefox-launcher',
	'karma-junit-reporter'
]
