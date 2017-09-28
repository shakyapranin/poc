// Pranin Shakya      - www.view9.com.au
/*jslint node: true */
var express = require('express'); // Require expressjs

var isUseHTTPs = !(!!process.env.PORT || !!process.env.IP); // process.env.PORT and .IP are set by hosts like heroku etc

var port = process.env.PORT || 9001; // Use port specified by host environment or use 9001 if not available.

try {
    var _port = require('./config.json').port; // Use the port specified in the config.json file

    if (_port && _port.toString() !== '9001') {
        port = parseInt(_port);
    }
} catch (e) {
    console.error("Exception occured while initiating port variable" + e);
}

var server = require(isUseHTTPs ? 'https' : 'http'), // create a http or http server
    url = require('url'),
    path = require('path'),
    fs = require('fs');

function serverHandler(request, response) {
    'use strict';
    var uri = url.parse(request.url).pathname, //        '/application/Video-Scalable-Broadcast.html'
        filename = path.join(process.cwd(), uri); // '/var/www/html/rtcmulticonnection/application/Video-Scalable-Broadcast.html'
    var stats;
    try {
        stats = fs.lstatSync(filename);
    } catch (e) {
        response.writeHead(404, {
            'Content-Type': 'text/plain'
        });
        response.write('404 Not Found: ' + path.join('/', uri) + '\n');
        response.end();
        return;
    }

    if (fs.statSync(filename).isDirectory()) {
        response.writeHead(404, {
            'Content-Type': 'text/html'
        });

        // Check url to redirect to MultiRTC folder or index file inside application folder.
        if (filename.indexOf('/application/MultiRTC/') !== -1) {
            filename = filename.replace('/application/MultiRTC/', '');
            filename += '/application/MultiRTC/index.html';
        } else if (filename.indexOf('/application/') !== -1) {
            filename = filename.replace('/application/', '');
            filename += '/application/index.html';
        } else {
            filename += '/application/index.html';
        }
    }


    fs.readFile(filename, 'utf8', function(err, file) {
        if (err) {
            response.writeHead(500, {
                'Content-Type': 'text/plain'
            });
            response.write('404 Not Found: ' + path.join('/', uri) + '\n');
            response.end();
            return;
        }

        try {
            var application = (fs.readdirSync('application') || []);

            if (application.length) {
                var h2 = '<h2 style="text-align:center;display:block;"><a href="https://www.npmjs.com/package/rtcmulticonnection-v3"><img src="https://img.shields.io/npm/v/rtcmulticonnection-v3.svg"></a><a href="https://www.npmjs.com/package/rtcmulticonnection-v3"><img src="https://img.shields.io/npm/dm/rtcmulticonnection-v3.svg"></a><a href="https://travis-ci.org/muaz-khan/RTCMultiConnection"><img src="https://travis-ci.org/muaz-khan/RTCMultiConnection.png?branch=master"></a></h2>';
                var otherDemos = '<section class="experiment" id="application"><details><summary style="text-align:center;">Check ' + (application.length - 1) + ' other RTCMultiConnection-v3 application</summary>' + h2 + '<ol>';
                application.forEach(function(f) {
                    if (f && f !== 'index.html' && f.indexOf('.html') !== -1) {
                        otherDemos += '<li><a href="/application/' + f + '">' + f + '</a> (<a href="https://github.com/muaz-khan/RTCMultiConnection/tree/master/application/' + f + '">Source</a>)</li>';
                    }
                });
                otherDemos += '<ol></details></section><section class="experiment own-widgets latest-commits">';

                file = file.replace('<section class="experiment own-widgets latest-commits">', otherDemos);
            }
        } catch (e) {}

        response.writeHead(200);
        response.write(file, 'utf8');
        response.end();
    });
}

var app = express(); // Initialize express instance
var serverInstance; // Here serverInstance works as the real server on top of expressjs

app.use(express.static('application')); // serve the static request from inside the application folder
app.get("/",serverHandler); // send default route to handler

// Initializing an http server app instance or https server app instance as per isUseHTTPs determiner

if (isUseHTTPs) {
    var options = {
        key: fs.readFileSync(path.join(__dirname, 'fake-keys/privatekey.pem')),
        cert: fs.readFileSync(path.join(__dirname, 'fake-keys/certificate.pem'))
    };
    serverInstance = server.createServer(options,app);
} else serverInstance = server.createServer(app);

// Listen to the port
var appMain;
appMain = serverInstance.listen(port, process.env.IP || '0.0.0.0', function() {
    var addr = serverInstance.address();
    console.log('Server listening at', addr.address + ':' + addr.port);
});

require('./Signaling-Server.js')(appMain, function(socket) {
    try {
        var params = socket.handshake.query;

        // "socket" object is totally in your own hands!
        // do whatever you want!

        // in your HTML page, you can access socket as following:
        // connection.socketCustomEvent = 'custom-message';
        // var socket = connection.getSocket();
        // socket.emit(connection.socketCustomEvent, { test: true });

        if (!params.socketCustomEvent) {
            params.socketCustomEvent = 'custom-message';
        }

        // On event triggered emit the event globally to all connected to this socket session

        socket.on(params.socketCustomEvent, function(message) {
            try {
                socket.broadcast.emit(params.socketCustomEvent, message);
            } catch (e) {}
        });
    } catch (e) {}
});
