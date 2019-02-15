const bodyParser = require('body-parser');
const commandLineArgs = require('command-line-args');
const express = require('express');
const { OK } = require('http-status-codes');
// const _ = require('lodash');
const { default: createLogger } = require('logging');

const DEFAULT_PORT = 3000;

const requestLogger = createLogger('requests');
const statusLogger = createLogger('status');

const setupExpress = (port) => {
  const app = express();

  // Apply middleware.
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  // All requests.
  app.all('*', (req, res, next) => {
    requestLogger.debug(req.method, req.originalUrl, req.body);

    next();
  });

  // GET routes.
  app.get('/', (req, res) => {
    res
      .status(OK)
      .send('Welcome!')
      .end();
  });

  app.listen(port, () => statusLogger.info('Listening on port', port));
};

function main() {
  // Extract command line arguments.
  const args = commandLineArgs([
    { name: 'port', type: Number, defaultValue: DEFAULT_PORT },
  ]);

  const { port } = args;

  // Configure routes.
  setupExpress(port);
}

main();
