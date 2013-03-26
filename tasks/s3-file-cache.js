/**
 * This task is for caching files.
 *
 * Set some environment variables:
 *
 * AWS_ACCESS_KEY_ID
 * AWS_SECRET_ACCESS_KEY
 *
 * To run:
 * node index.js s3-file-cache http://example.com/file.json file-name.json path/to/s3/dir/
 */
var _ = require('underscore');
var knox = require('knox');
var request = require('request');
var fs = require('fs');


var task = {
  defaults: {
    bucket: 'data.minnpost',
    headers: {
      'x-amz-acl': 'public-read'
    },
    key: process.env.AWS_ACCESS_KEY_ID,
    secret: process.env.AWS_SECRET_ACCESS_KEY
  },
  
  saveTemp: function(body) {
    var thisTask = this;
    
    fs.writeFile('/tmp/' + thisTask.filename, body, function(err) {
      if (!err) {
        thisTask.copyS3('/tmp/' + thisTask.filename);
      }
    });
  },
  
  copyS3: function(localFile) {
    var thisTask = this;
    
    this.client.putFile(localFile, this.s3Directory + thisTask.filename, 
      this.defaults.headers, function(error, response) {
      if (!error && response.statusCode == 200) {
        console.log(response);
      }
    });
  },
  
  run: function(args) {
    var thisTask = this;
    this.remoteFile = args[0];
    this.filename = args[1];
    this.s3Directory = args[2];
  
    if (this.defaults.key && this.defaults.secret) {
      this.client = knox.createClient({
        key: this.defaults.key,
        secret: this.defaults.secret,
        bucket: this.defaults.bucket
      });
      
      // Get file and store in temp place
      request({ uri: this.remoteFile }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
          thisTask.saveTemp(body);
        }
      });
    }
  }
};

module.exports = task;