/*
 * grunt-contrib-jshint
 * http://gruntjs.com/
 *
 * Copyright (c) 2013 "Cowboy" Ben Alman, contributors
 * Licensed under the MIT license.
 */

'use strict';

// A very simple substitude for process.stdout that buffers writes in memory.
module.exports = function() {
  var chunks = [];

  function write(chunk, encoding) {
    // Convert strings unto buffers.
    if (!(chunk instanceof Buffer)) {
      chunk = new Buffer(chunk, encoding);
    }
    chunks.push(chunk);
  }

  function toBuffer() {
    // Find the total length of writes.
    var length = chunks.reduce(function(sum, chunk) {
      return sum + chunk.length;
    }, 0);

    // Create a big buffer for everything.
    var buffer = new Buffer(length);
    var offset = 0;

    // Copy everything in.
    chunks.forEach(function(chunk) {
      chunk.copy(buffer, offset);
      offset += chunk.length;
    });

    return buffer;
  }

  return {
    write: write,
    toBuffer: toBuffer
  };
};
