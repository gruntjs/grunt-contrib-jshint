/*
 * grunt-contrib-jshint
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 "Cowboy" Ben Alman, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Internal lib.
  var jshint = require('./lib/jshint').init(grunt);

  /**
   * Returns a string with encoded HTML characters
   *
   * @param {string} text The text to encode
   * @return {string}
   */
  function encodeHTML (text) {
    if (!text) {
        return '';
    }

    return text
      .replace(/"/g, '&quot;') // "
      .replace(/&/g, '&amp;')  // &
      .replace(/</g, '&lt;')   // <
      .replace(/>/g, '&gt;')   // >
      .replace(/'/g, '&apos;');// '
  }

  grunt.registerMultiTask('jshint', 'Validate files with JSHint.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options();

    var template;
    // get path for junit xml output file
    var junit = grunt.config('jshint.junit');
    // get path for checkstyle xml output file
    var checkstyle = grunt.config('jshint.checkstyle');
    var report = {
      files: []
    };
    var underscore = (grunt.util && grunt.util._) ? grunt.util._ : grunt.utils._;
    // load template files
    var templates = {
      junit: grunt.file.read(__dirname + '/templates/junit.tmpl'),
      checkstyle: grunt.file.read(__dirname + '/templates/checkstyle.tmpl')
    };

    // Read JSHint options from a specified jshintrc file.
    if (options.jshintrc) {
      options = grunt.file.readJSON(options.jshintrc);
    }
    // If globals weren't specified, initialize them as an empty object.
    if (!options.globals) {
      options.globals = {};
    }
    // Convert deprecated "predef" array into globals.
    if (options.predef) {
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
    files.forEach(function(filepath, index) {
      var errors = jshint.lint(grunt.file.read(filepath), options, globals, filepath);
      var passed = true;

      if (errors) {
        passed = errors.length === 0;
      }

      // fill report
      report.files[index] = {
        filepath: filepath,
        passed: passed,
        errors: errors
      };
    });

    report.encode = encodeHTML;
    report.workspace = grunt.option('workspace') || '';

    if (junit) {
      template = underscore.template(templates.junit, {
        'obj': report
      });
      grunt.file.write(junit, template);
    }

    if (checkstyle) {
      template = underscore.template(templates.checkstyle, {
        'obj': report
      });
      grunt.file.write(checkstyle, template);
    }

    // Fail task if errors were logged.
    if (this.errorCount) { return false; }

    // Otherwise, print a success message.
    grunt.log.ok(files.length + ' file' + (files.length === 1 ? '' : 's') + ' lint free.');
  });

};
