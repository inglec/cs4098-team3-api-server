const { OK, UNAUTHORIZED } = require('http-status-codes');
const supertest = require('supertest');

const app = require('../src/app');

describe('GET /', () => {
  test('returns 200 response', () => (
    supertest(app)
      .get('/')
      .then((response) => {
        expect(response.statusCode).toBe(OK);
        expect(response.text).toBe('test');
      })
  ));
});

describe('POST /', () => {
  test('returns 401 response without token', () => (
    supertest(app)
      .post('/')
      .then((response) => {
        expect(response.statusCode).toBe(UNAUTHORIZED);
        expect(response.body).toEqual({ message: 'no token provided' });
      })
  ));
});
