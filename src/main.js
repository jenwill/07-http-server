const server = require('./lib/server');

// server.start(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));

server.start(3000, () => console.log('Listening on port 3000'));
