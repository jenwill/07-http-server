'use strict';

// const logger = require('./logger');
const http = require('http');
const cowsay = require('cowsay');
const bodyParser = require('./body-parser');
const faker = require('faker');

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
        const html = '<!DOCTYPE html><html><head><title> cowsay </title></head><body><header><nav><ul><li><a href="/cowsay">cowsay</a></li></ul></nav></header><main><p>This project is a very simple HTTP server by Jennifer Piper.</p><p>To see a silly cow say your message, go to localhost:3000/cowsay?text=<em>your-message</em> with your browser.</p><p>To see the silly cow say a random message, go to localhost:3000/cowsay, or follow the <strong>cowsay</strong> link above.</p></main></body></html>';
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(html);
        res.end();
        return undefined;
      }
      if (parsedRequest.method === 'GET' && parsedRequest.url.pathname === '/cowsay') {
        let cowsayText = '';
        if (parsedRequest.url.query.text) {
          cowsayText = cowsay.say({ text: parsedRequest.url.query.text });
        } else {
          const fakedString = faker.random.words();
          cowsayText = cowsay.say({ text: fakedString });
        }
        const html = `<!DOCTYPE html><html><head><title> cowsay </title></head><body><header><nav><ul><li><a href="/">home</a></li></ul></nav></header><h1> cowsay</h1><pre>${cowsayText}</pre></body></html>`;

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(html);
        res.end();
        return undefined;
      }
      if (parsedRequest.method === 'GET' && parsedRequest.url.pathname === '/api/cowsay') {
        let cowsayText = '';
        if (parsedRequest.url.query.text) {
          cowsayText = cowsay.say({ text: parsedRequest.url.query.text });
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.write(`{ "content": "${cowsayText}"}`);
        } else {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.write('{"error": "invalid request: text query required"}');
        }
        res.end();
        return undefined;
      }
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.write('NOT FOUND');
      res.end();
      return undefined;
    })
    .catch((err) => {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.write('BAD REQUEST', err);
      res.end();
      return undefined;
    });
});

server.start = (port, callback) => app.listen(port, callback);
server.stop = callback => app.close(callback);
