const { default: createLogger } = require('logging');

const app = require('./app');

function main() {
  // Access environment variables
  const { PORT: port } = process.env;

  if (!port) {
    throw Error('environment variable PORT not set');
  }

  const logger = createLogger('tt:server');
  app.listen(port, () => logger.info('Listening on port', port));
}

main();
