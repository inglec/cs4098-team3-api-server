const { createConnection } = require('../src/mysql');
const { users } = require('../sql_config');

describe('user `root`', () => {
  const root = createConnection('root', users.root.password);

  test('establishes connection to database', () => (
    expect(root.authenticate())
      .resolves
      .toBe(undefined)
  ));

  // TODO: Access tables

  test('closes connection', () => (
    expect(root.close())
      .resolves
      .toEqual(expect.arrayContaining([undefined]))
  ));
});
