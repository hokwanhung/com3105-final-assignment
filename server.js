/*
	http_server_input_file.js
	
	This server will display the content of html file 
*/

// http module is required to create a web server
var http = require('http');

// fs module is required to read file from file system
var fs = require('fs');

// url module is required to parse the URL passed to server
var url = require('url');

var mime = require('mime');

// create the server
http.createServer(function (request, response) {

	// parse the incoming request's url, which is an object containing path and file name
	var pathname = url.parse(request.url).pathname;

	// print the pathname of the file
	console.log('Pathname= ' + pathname);

	// copy from pathname starting from position 1 to the end (position 0 will be dropped)
	console.log('pathname.substr(1)= ' + pathname.substr(1));

	// read the requested file content from file system
	fs.readFile(pathname.substr(1), function (err, data) {
		if (err) {
			console.log(err.stack);
			// HTTP status: 404 : NOT FOUND
			response.writeHead(404, {'Content-Type' : 'text/html'});
			response.write('Error: reading input file');
		} else {
        response.writeHead(200, {"Content-Type": mime.getType(pathname.substr(1))});



			// write the content of the file to response body
			response.write(data);
		}
		// send the response body
		response.end();
	});

}).listen(8081);

console.log('Server running at http://localhost:8081/parent.html or http://127.0.0.1:8081/parent.html');

console.log('Server Program Ended.');
