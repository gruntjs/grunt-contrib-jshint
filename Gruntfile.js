/*
 * grunt-contrib-jshint
 * http://gruntjs.com/
 *
 * Copyright (c) 2016 "Cowboy" Ben Alman, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      allFiles: [
        'Gruntfile.js',
        'tasks/**/*.js',
        '<%= nodeunit.tests %>'
      ],
      individualFiles: {
        files: [
          {src: 'Gruntfile.js'},
          {src: 'tasks/**/*.js'},
          {src: '<%= nodeunit.tests %>'}
        ]
      },
      withReporterShouldFail: {
        options: {
          reporter: 'checkstyle',
          reporterOutput: 'tmp/report.xml',
          force: true
        },
        src: [
          'test/fixtures/missingsemicolon.js',
          'test/fixtures/wrule.js'
        ]
      },
      ignoresSupportGruntFile: {
        src: ['test/fixtures/dontlint_gruntfile.txt'],
        options: {
          ignores: 'test/fixtures/dontlint_gruntfile.txt'
        }
      },
      // this rule should ignore node_modules and dontlint.txt using .jshintignore.
      // only nodemodule.js should be linted
      ignoresSupportIgnoreFile: {
        src: ['test/fixtures/dontlint.txt', 'node_modules/**', 'test/fixtures/nodemodule.js']
      },
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-internal');

  // Whenever the "test" task is run, run the "nodeunit" task.
  grunt.registerTask('test', ['jshint', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['test', 'build-contrib']);

};
