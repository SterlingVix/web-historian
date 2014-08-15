var path = require('path');
var fs = require('fs');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt'),
  'htmlFetcher' : path.join(__dirname, '../workers/htmlfetcher')
//   'htmlFetcher' : path.join(__dirname, '../workers/htmlfetcher.js') // .js???
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(){
  var accumulator;
  fs.readFile(exports.paths.list, function (err, data) {
    if (err) {
      throw err;
    }
    accumulator = data.toString(); // convert from <buffer> stream to 
    accumulator = accumulator.split('\n');
    console.log("accumulator = ", accumulator);
    return accumulator;
  }); // end fs.readFile
  
  console.log("accumulator = ", accumulator);
  return accumulator;
};

exports.isUrlInList = function(){
  // check /archives/sites.txt for matching URL
};

exports.addUrlToList = function(fileLocation, stringToWrite, suppressNewline){ // var writeToFile = function(fileLocation, stringToWrite, suppressNewline) {
  var stringOut = "";
  var aTime = new Date(); // just useful to have around :)
  if (!suppressNewline) { stringOut += "\n"; } // add newline if not suppressed
  stringOut += stringToWrite

  // http://nodejs.org/api/all.html#all_fs_appendfile_filename_data_options_callback
  fs.appendFile(fileLocation, stringOut, function (err) { // fs.appendFile(filename, data, [options], callback)
    if (err) throw err;
  });

// //   console.log("in addUrlToList");
//   fs.appendFiles(exports.paths.list, url+ '\n', function(err, file)__dirnameif(cb){
//     cb();
//   });
  // append URL to /archives/sites.txt
};

exports.isURLArchived = function(){
  // check /archives/sites folder for matching file
};

exports.downloadUrls = function(){
  // reach out on web and cache page
};


