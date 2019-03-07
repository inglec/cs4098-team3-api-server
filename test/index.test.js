const supertest = require('supertest');
const { OK } = require('http-status-codes');

const app = require('../src/app');

describe('/', () => {
  test('returns 200 response', () => (
    supertest(app)
      .get('/')
      .then((response) => {
        expect(response.statusCode).toBe(OK);
        expect(response.text).toBe('test');
      })
  ));
});
