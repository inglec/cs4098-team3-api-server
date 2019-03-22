// const requestPromise = require('request-promise');

// const { urls: { authServer: AUTH_SERVER_URL } } = require('../sql_config');

const authenticateRequest = (token) => {
  if (!token) {
    return Promise.reject(Error('no token provided'));
  }

  // TODO: use auth server
  // return requestPromise({
  //   method: 'POST',
  //   uri: AUTH_SERVER_URL,
  //   body: { token },
  //   json: true,
  // })

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (token) {
        resolve('patient');
      } else {
        reject(Error('bad token'));
      }
    }, 100);
  });
};

module.exports = { authenticateRequest };
