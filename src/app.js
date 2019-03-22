const bodyParser = require('body-parser');
const express = require('express');
const { UNAUTHORIZED } = require('http-status-codes');
const { default: createLogger } = require('logging');

const { authenticateRequest } = require('./auth');

const setupExpress = () => {
  const app = express();
  const logger = createLogger('tt:app');

  // Apply middleware
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use((req, res, next) => {
    logger.debug(req.method, req.originalUrl, req.body);

    switch (req.method) {
      // Authenticate all POST requests
      case 'POST':
        authenticateRequest(req.body.token)
          .then((userType) => {
            req.userType = userType;
            next();
          })
          .catch((error) => {
            res.status(UNAUTHORIZED).json({ message: error.message });
            logger.debug(error);
          });
        break;
      default:
        next();
    }
  });

  app.get('/', (req, res) => res.send('test'));

  app.post('/', (req, res) => res.send('test'));

  return app;
};

module.exports = setupExpress();
