const { authenticateRequest } = require('../src/auth');

describe('authenticateRequest', () => {
  test('rejects empty token', () => (
    expect(authenticateRequest())
      .rejects
      .toThrow('no token provided')
  ));
});
