var http = require('http');
var path = require('path');
var fs = require ('fs');

var hostname = 'localhost';
var port = 5000;

var server = http.createServer(function(req, res) {
    console.log(`Request for ${req.url} by method ${req.method}`);

    if (req.method === 'GET') {
        var fileUrl = req.url;
        if (fileUrl === '/') {
            fileUrl = '/home.html';
        } else if
            (fileUrl ==='/about') {
                fileUrl = '/about.html';

            } else if (fileUrl === '/contact') {
                fileUrl = '/contact.html';
            }
        
        

        var filePath = path.resolve('./' + fileUrl);
        var fileExt = path.extname(filePath);

        if (fileExt === '.html') {
            fs.access (filePath, function(err){
                if (err) {
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/html');
                    // res.end(`<html><body><h1>Error 404: ${fileUrl} not found </h1></body></html>`);
                    res.end(`<html><body><h1>Invalid Request!</h1></body></html>`);
                    return;
                }
                res.statusCode = 200;
                res.setHeader('Content-Type','text/html');
                fs.createReadStream(filePath).pipe(res);
                });
                } else {
                    res.statusCode = 404;
                    res.setHeader('Content-Type','text/html');
                    res.end(`<html><body><h1>Error 404: ${fileUrl} its not an HTML file </h1></body></html>`);
                } 
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type','text/html');
        res.end(`<html><body><h1>Error 404: ${req.method} not supported </h1></body></html>`);
    }
});

    server.listen(port, hostname, () => {
        console.log(`The NodeJS server on port ${port} is now running...`);
    });