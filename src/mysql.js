const Sequelize = require('sequelize');

const { database, dialect, host } = require('../sql_config');

const createConnection = (user, password) => (
  new Sequelize(database, user, password, { host, dialect })
);

module.exports = { createConnection };
