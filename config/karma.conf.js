module.exports = function(config) {
  var testWebpackConfig = require('./webpack.test.js');

  // Example set of browsers to run on Sauce Labs 
  // Check out https://saucelabs.com/platforms for all browser/platform combos 
  var customLaunchers = {
    sl_chrome: {
      base: 'SauceLabs',
      browserName: 'chrome',
      platform: 'Windows 7',
      version: '35'
    },
    sl_firefox: {
      base: 'SauceLabs',
      browserName: 'firefox',
      version: '30'
    },
    sl_ios_safari: {
      base: 'SauceLabs',
      browserName: 'iphone',
      platform: 'OS X 10.9',
      version: '7.1'
    },
    sl_ie_11: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      platform: 'Windows 8.1',
      version: '11'
    }
  }

  var cfg = {

    // base path that will be used to resolve all patterns (e.g. files, exclude)
    basePath: '',

    /*
     * Frameworks to use
     *
     * available frameworks: https://npmjs.org/browse/keyword/karma-adapter
     */
    frameworks: ['jasmine'],

    // list of files to exclude
    exclude: [ ],

    /*
     * list of files / patterns to load in the browser
     *
     * we are building the test environment in ./spec-bundle.js
     */
    files: [ { pattern: './config/spec-bundle.js', watched: false } ],

    /*
     * preprocess matching files before serving them to the browser
     * available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
     */
    preprocessors: { './config/spec-bundle.js': ['coverage', 'webpack', 'sourcemap'] },

    // Webpack Config at ./webpack.test.js
    webpack: testWebpackConfig,

    coverageReporter: {
      dir : 'coverage/',
      reporters: [
        { type: 'text-summary' },
        { type: 'json' },
        { type: 'html' }
      ]
    },

    // Webpack please don't spam the console when running in karma!
    webpackServer: { noInfo: true },

    /*
     * test results reporter to use
     *
     * possible values: 'dots', 'progress'
     * available reporters: https://npmjs.org/browse/keyword/karma-reporter
     */
    reporters: [ 'mocha', 'coverage' ],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    /*
     * level of logging
     * possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
     */
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    /*
     * start these browsers
     * available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
     */
    browsers: process.env.SAUCE_USERNAME [
      'Chrome'
    ],

    /*
     * Continuous Integration mode
     * if true, Karma captures browsers, runs the tests and exits
     */
    singleRun: true
  };

  if (process.env.SAUCE_USERNAME) {
    cfg.browsers = Object.keys(customLaunchers);
    cfg.sauceLabs = {
        testName: 'Docker Swarm Wheelhouse Web App Unit Tests'
    };
    cfg.customLaunchers = customLaunchers;
    cfg.reporters = ['dots', 'saucelabs'];
  }

  config.set(cfg);
};
