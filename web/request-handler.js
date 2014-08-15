var archive = require('../helpers/archive-helpers');
var path = require('path'); // from archive-helper // ORIGINAL!!! No "s"
var httpHelpers = require("./http-helpers"); // httpHelpers.headers && httpHelpers.serveAssets(response, asset, callback)

// var handler =     require("./request-handler");
// var server = http.createServer(handler.handleRequest); // incoming messages are processed by ./request-handler.js.handleRequest

// require more modules/folders here!
var fs = require('fs'); // ???
var _ = require('underscore'); // ???

// NOTE: To call these in a file, just write localName;.  NO NEED FOR ()!!!
var initialize = archive.initialize; // from archive-helpers.js
var listOfUrls = archive.paths.list;  // from archive-helpers.js
var readListOfUrls = archive.readListOfUrls; // from archive-helpers.js
// var isUrlInList = archive.isUrlInList; // from archive-helpers.js
// var addUrlToList = archive.addUrlToList; // from archive-helpers.js
// var isURLArchived = archive.isURLArchived; // from archive-helpers.js
// var downloadUrls = archive.downloadUrls; // from archive-helpers.js

// var updateCurrentSites = function() {} // end updateCurrentSites()



exports.handleRequest = function (request, response) {
  var headers = httpHelpers.headers; // works
  var parsedURL = request.url.split('.');
  if(!parsedURL.length) { httpHelpers.send404(response);
  } else if (parsedURL.length === 1) { parsedURL = parsedURL[0]; // reassign self to string
  } else { parsedURL = parsedURL[1]; } // 2nd element ought to be domain
  
  var doGET = function(request, response) {
    // check file for matching sites
//     var urls = archive.readListOfUrls();
  var urls;
  
  fs.readFile(listOfUrls, function (err, data) {
    if (err) {
      throw err;
    }
    urls = data.toString(); // convert from <buffer> stream to 
    urls = urls.split('\n');
    console.log("urls = ", urls);
  }); // end fs.readFile
  
  setTimeout(function() {console.log("urls2 = ",  urls)}, 1000);
    // if match: 
    
    
    
    var doGETResponse = function (response, data, statusCode){ // exports.sendResponse = function(response, data, statusCode){
      response.writeHead( (statusCode || 200), httpHelpers.headers); // response.writeHead(statusCode, defaultCorsHeaders);
      response.write('<input' + data);
      response.end(JSON.stringify(data)); // response.end();
    }; // end doGETResponse()

    // INVOKE doGETResponse
    doGETResponse(response, parsedURL); // utils.sendResponse( response, {results: messages} );
  }; // end doGET
  
  
  
  
  var doPOST = function(request, response) {
    var reqDetails = JSON.stringify(request);
    var resDetails = JSON.stringify(response);  
    var stringToWrite = request; // ?????
    
    archive.addUrlToList(listOfUrls, stringToWrite, true); // (fileLocation, stringToWrite, suppressNewline)
  }; // end doPOST
  
  
  
  var doPUT = function(request, response) {
//     utils.collectData(request, function(INPUT){
//       messageIdCounter++;
//       message.objectId = messageIdCounter;
//       messages.unshift(message);
//     });
  }; // end doPUT
  
  
  
  var doDELETE = function(request, response) {
//     utils.collectData(request, function(INPUT){
//       messageIdCounter++;
//       message.objectId = messageIdCounter;
//       messages.unshift(message);
//     });
  }; // end doDELETE
  
  
  
  var doOPTIONS = function(request, response) {
//     utils.sendResponse( response );
  }; // end doOPTIONS
  
  
  
   if ( request.method === 'GET' ) { // if GET
    doGET(request, response);
  } else if ( request.method === 'POST' ) { // end if (GET) ;; if (POST)
    doPOST(request, response);
  } else if ( request.method === 'PUT' ) { // end if (POST) ;; if (PUT)
    doPUT(request, response);
  } else if ( request.method === 'DELETE' ) { // end if (PUT) ;; if (DELETE)
    doDELETE(request, response);
  } else if ( request.method === 'OPTIONS' ) { // end if (DELETE) ;; if (OPTIONS)
    doOPTIONS(request, response);
  } else { // end if (OPTIONS) ;; else (error)
    httpHelpers.send404(response);
  } // end else (error)
    // NEVER GETS THIS FAR...?
    //response.end(archive.paths.list); // 
  //};
}; // end handleRequest()

// function(request, response){

//   var parsedUrl = urlParser.parse(request.url);

//   var route = routeMap[parsedUrl.pathname];
//   if( route ){
//     route( request, response );
//   } else {
//     utils.send404( response );
//   }

// }









////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
//////////////////      File Writing      //////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////

// writeToFile(listOfUrls, testFunc()); // should write test message + date + newline to list

// exports.writeToFile...???
// var writeToFile = function(fileLocation, stringToWrite, suppressNewline) {
//   var stringOut = "";
//   var aTime = new Date(); // just useful to have around :)
//   if (!suppressNewline) { stringOut += "\n"; } // add newline if not suppressed
//   stringOut += stringToWrite
  
//   // http://nodejs.org/api/all.html#all_fs_appendfile_filename_data_options_callback
//   fs.appendFile(fileLocation, stringOut, function (err) { // fs.appendFile(filename, data, [options], callback)
//     if (err) throw err;
//     console.log('File at ' + fileLocation + ' appended with ' + stringToWrite + ' ');
//   });
// } // end writeToFile()


////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
//////////////////      File Reading      //////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////

// var textFile = require('../archives/sites.txt'); // include text file location???


var currentSites = "";

fs.readFile(listOfUrls, function (err, data) {
  if (err) {
    throw err;
  }
    // right now data is a <buffer> stream node
    currentSites = data.toString(); // convert to string
}); // end fs.readFile
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
//////////////////         TESTING        //////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////


// 1) Should answer GET requests for /
// inside handleRequest with 
//     {"url":"/",
//     "method":"GET"} 
// and 
//     {"_ended":false,
//     "_responseCode":null,
//     "_headers":null,
//     "_data":""}
    
    
// 2) Should answer GET requests for archived websites
// inside handleRequest with 
//     {"url":"/www.google.com",
//     "method":"GET"} 
// and 
//     {"_ended":false,
//     "_responseCode":null,
//     "_headers":null,"_data":""}


// 3) Should append submitted sites to 'sites.txt'
// inside handleRequest with 
//     {"url":"/",
//     "method":"POST",
//     "_postData":{"url":"www.example.com"}} 
// and 
//     {"_ended":false,
//     "_responseCode":null,
//     "_headers":null,
//     "_data":""}


// 4) Should 404 when asked for a nonexistent file
// inside handleRequest with 
//     {"url":"/arglebargle",
//     "method":"GET"} 
// and 
//     {"_ended":false,
//     "_responseCode":null,
//     "_headers":null,
//     "_data":""}
    
    
//   html fetcher helpers
//     5) should have a 'readListOfUrls' function
//     √ should have a 'downloadUrls' function
////////////////////////////////////////////



//module.exports = function(request, response) {
  
  
  
  
// var getHandler = function(req, res){
//   pathname = url.parse(req.url).pathname;
  
//   if (pathname === '/'){
//     pathname = '/index.html';
//   }
  
//   httpHelpers.serveAssets(res, pathname, function() {
//     archive.isUrlInList(pathname.slice(1), function(isInList){
//       if(isInList){
//         httpHelpers.sendRedirect(res, 'loading.html');
//       } else {
//         httpHelpers.send404(res);
//       } // end else
//     });
//   });
// }; // end getHandler