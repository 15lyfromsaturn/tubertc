/**
 * @file tuber-time web server.
 * @version 2.0.0
 */

'use strict';

var easyrtc = require('easyrtc');
var express = require('express');
var path = require('path');
var io = require('socket.io');

// Web application setup (for setting up routes)
var app = express();
var serverPort = process.env.PORT || 8080;

app.get('/*', express.static(path.join(__dirname, '/public/')));

var webServer = require('http')
  .createServer(app)
  .listen(serverPort);

// Set log level according to debugMode, on production, log level is on error only
var ioOpts = { 'log level': 0 };

var socketServer = io.listen(webServer, ioOpts);

// Set up easyrtc specific options
easyrtc.setOption('demosEnable', false);
easyrtc.setOption('updateCheckEnable', false);
easyrtc.setOption('appIceServers', [
  {
    url: 'stun:stun.l.google.com:19302'
  },
  {
    url: 'stun:stun.sipgate.net'
  },
  {
    url: 'stun:217.10.68.152'
  },
  {
    url: 'stun:stun.sipgate.net:10000'
  },
  {
    url: 'stun:217.10.68.152:10000'
  }
]);

easyrtc.listen(app, socketServer);
