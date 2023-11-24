const { pgPool } = require('./connection.js');

const sql = {
  GET_USER: 'SELECT user_id, username, email, created FROM users WHERE user_id=$1',
  GET_ALL_USERS: 'SELECT user_id, username, email, created FROM users',
  REGISTER: 'INSERT INTO users (username, email, password) VALUES ($1,$2,$3)',
  LOGIN: 'SELECT user_id, password FROM users WHERE username=$1'
};

async function getUsers(user_id) {
  if (user_id) {
    let result = await pgPool.query(sql.GET_USER, [user_id]);
    return result.rowCount > 0
      ? { code: 202, content: result.rows[0] }
      : { code: 404, content: { error: 'User not found by user_id' } };
  }

  let result = await pgPool.query(sql.GET_ALL_USERS);
  return { code: 202, content: result.rows };
}

const register = async (username, email, password) => {
  const result = await pgPool.query(sql.REGISTER, [username, email, password]);

  return result.rowCount > 0
    ? { code: 202, content: result.rows[0] }
    : { code: 404, content: { error: 'Could not create user' } };

};

const login = async (username) => {
  const result = await pgPool.query(sql.LOGIN, [username]);

  return result.rowCount > 0
    ? { code: 202, content: result.rows[0] }
    : { code: 404, content: { error: 'User not found by username' } };
}

module.exports = { getUsers, register, login };
