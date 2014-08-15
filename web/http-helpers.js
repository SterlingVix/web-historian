var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var path = require('path');

// Paths
var archivePath = '../archives/'; 
var archivedSitesPath = '../archives/sites/'; 

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
}; // end headers

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...), css, or anything that doesn't change often.)
  // IN CHATTERBOX-SERVER "statuscode" was the 3rd parameter... // statusCode = statusCode || 200;
  var statusCode = 200; // TEMPORARY
  res.writeHead(statusCode, headers); // _responseCode, _headers
  
              var resDetails = JSON.stringify(res);
              var assetDetails = JSON.stringify(asset);
  
  res.end(JSON.stringify(asset)); // _ended, _data
                                  // {"_ended":false,
                                  // "_responseCode":null,
                                  // "_headers":null,
                                  // "_data":""}
}; // end serveAssets
    
exports.send404 = function(response){
  response.writeHead(404, headers);
  response.end(response);
}; // end send404


// As you progress, keep thinking about what helper functions you can put here!