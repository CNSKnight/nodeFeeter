/**
* a simple node server that leverages a would-be module nodeFeeter;
* @depends
* - http
* - nodFeeder.js
*/

var nF = require('./nodeFeeter.js');
var http = require('http');

http.createServer(function (request, response) {
        var target = request.url.match(/cnnbrk-tweets/g);
        if (! target || ! target.length) {
            response.end('Requested resource does not live here.');
        }
        
        var tL = nF.tu.userTimeline({screen_name: 'cnnbrk', count: 10}, function(err, feed) {
                if (feed) {
                    nF.feed = feed;
                    
                    var markup = nF.render();
                    
                    response.end(markup);
                }
        });
}).listen(30000); 

/**
* @note my server locked up on 3000 at one point and wouldn't give it back
*/

console.log('Server running at http://127.0.0.1:30000/');
