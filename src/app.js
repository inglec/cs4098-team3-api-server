const bodyParser = require('body-parser');
const express = require('express');
const { default: createLogger } = require('logging');

const setupExpress = () => {
  const app = express();
  const logger = createLogger('tt:app');

  // Apply middleware
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use((req, res, next) => {
    logger.debug(req.method, req.originalUrl, req.body);
    next();
  });

  app.get('/', (req, res) => res.send('test'));

  return app;
};

module.exports = setupExpress();
