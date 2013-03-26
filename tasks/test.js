/**
 * This task is just for testing.
 */
var _ = require('underscore');

var task = {
  run: function(args) {
    console.log('Task called');
    console.log('Arguments', args);
  }
};

module.exports = task;