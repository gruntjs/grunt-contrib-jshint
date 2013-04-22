/*
 * grunt-contrib-jshint
 * http://gruntjs.com/
 *
 * Copyright (c) 2013 "Cowboy" Ben Alman, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var jshint = require('./lib/jshint').init(grunt);

  grunt.registerMultiTask('jshint', 'Validate files with JSHint.', function() {
    var done = this.async();

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      force: false
    });

    // Report JSHint errors but dont fail the task
    var force = options.force;
    delete options.force;

    jshint.lint(this.filesSrc, options, function(results, data) {
      var failed = 0;
      if (grunt.fail.errorcount > 0) {
        // Fail task if errors were logged except if force was set.
        failed = force;
      } else {
        if (jshint.usingGruntReporter === true) {
          grunt.log.ok(data.length + ' file' + (data.length === 1 ? '' : 's') + ' lint free.');
        }
      }
      done(failed);
    });
  });

};
