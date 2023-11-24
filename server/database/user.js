const { pgPool } = require('./connection.js');

const sql = {
  GET_USER: 'SELECT user_id, username, email, created FROM users WHERE user_id=$1',
  GET_ALL_USERS: 'SELECT user_id, username, email, created FROM users',
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

module.exports = { getUsers };
