const server = require('./lib/server');
const logger = require('./lib/logger');

// server.start(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));

server.start(3000, () => logger.log(logger.INFO, 'Listening on port 3000'));
