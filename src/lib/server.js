'use strict';

// const logger = require('./logger');
const http = require('http');
const cowsay = require('cowsay');
const bodyParser = require('./body-parser');

const server = module.exports = {};

const app = http.createServer((req, res) => {
  bodyParser(req)
    .then((parsedRequest) => {
      if (parsedRequest.method === 'GET' && parsedRequest.url.pathname === '/time') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({
          date: new Date(),
        }));
        res.end();
        return undefined;
      }
      if (parsedRequest.method === 'GET' && parsedRequest.url.pathname === '/') {
        const cowsayText = cowsay.say({ text: 'sup.' });
        const html = '<!DOCTYPE html><html><head><title> cowsay </title></head><body><header><nav><ul><li><a href="/cowsay">cowsay</a></li></ul></nav></header><main>This project is a very simple HTTP server by Jennifer Piper.</main></body></html>';
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(html);
        res.write(cowsayText);

        res.end();
        return undefined;
      }
      return undefined;
    });
  return undefined;
});

server.start = (port, callback) => app.listen(port, callback);
// server.stop = () =>

