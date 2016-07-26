'use strict';

const server = require('http').createServer();
const WebSocketServer = require('ws').Server;
const wss = new WebSocketServer({ server: server });
const express = require('express');
const app = express();

wss.on('connection', function(ws) {
  ws.on('message', function(message) {
    console.log(message.toString('utf8'));
  });
});

server.on('request', app);
server.listen(8888);
