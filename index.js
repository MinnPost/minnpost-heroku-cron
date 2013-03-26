/**
 * Main task runner.
 *
 * Run: node index.js task-name arg1 arg2
 */
var _ = require('underscore');
var fs = require('fs');
var scriptArgs = process.argv.splice(2);

// Check if task is specified
if (scriptArgs[0]) {
  var file = './tasks/' + scriptArgs[0] + '.js';
  
  fs.exists(file, function(exists) {
    if (exists) {
      var task = require(file);
      task.run(scriptArgs.splice(1));
    }
  });
}
else {
  // Assume this is not being run through scheduler
  // so maybe just output an hello.
  
}