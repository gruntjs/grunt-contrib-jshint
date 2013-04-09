/*
 * grunt-contrib-jshint
 * http://gruntjs.com/
 *
 * Copyright (c) 2013 "Cowboy" Ben Alman, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Internal lib.
  var jshint = require('./lib/jshint').init(grunt);
  var cli = require('jshint/src/cli/cli');

  grunt.registerMultiTask('jshint', 'Validate files with JSHint.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      force: false,
      'extra-ext': ''
    });

    // Report JSHint errors but dont fail the task
    var force = options.force;
    delete options.force;

    // Are extra extension defined?
    var extensions = options['extra-ext'];
    delete options['extra-ext'];

    // Read JSHint options from a specified jshintrc file.
    if (options.jshintrc) {
      options = grunt.file.readJSON(options.jshintrc);
    }
    // If globals weren't specified, initialize them as an empty object.
    if (!options.globals) {
      options.globals = {};
    }
    // Convert deprecated "predef" array|object into globals.
    if (options.predef) {
      if (options.predef === Object(options.predef)) {
        options.predef = Object.keys(options.predef);
      }
      options.predef.forEach(function(key) {
        options.globals[key] = true;
      });
      delete options.predef;
    }
    // Extract globals from options.
    var globals = options.globals;
    delete options.globals;

    grunt.verbose.writeflags(options, 'JSHint options');
    grunt.verbose.writeflags(globals, 'JSHint globals');

    // Lint specified files.
    var files = this.filesSrc;
    cli.gather({ args: files, extensions: extensions }).forEach(function(filepath) {
      jshint.lint(grunt.file.read(filepath), options, globals, filepath);
    });

    // Fail task if errors were logged except if force was set.
    if (this.errorCount) { return force; }

    // Otherwise, print a success message.
    grunt.log.ok(files.length + ' file' + (files.length === 1 ? '' : 's') + ' lint free.');
  });

};
