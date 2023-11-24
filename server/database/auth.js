const { pgPool } = require('./connection');

const sql = {
  REGISTER: 'INSERT INTO users (username, email, password) VALUES ($1,$2,$3)',
  GET_PW: 'SELECT password FROM users WHERE user_id=$1'
};

const register = async (username, email, password) => {
  const result = await pgPool.query(sql.REGISTER, [username, email, password]);

  return result.rowCount > 0
    ? { code: 202, content: result.rows[0] }
    : { code: 404, content: { error: 'Could not create user' } };

};

const getPw = async (user_id) => {
  const result = await pgPool.query(sql.GET_PW, [user_id]);

  return result.rowCount > 0
    ? { code: 202, content: result.rows[0] }
    : { code: 404, content: { error: 'Password not found by user_id' } };
}

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

module.exports = { register, getPw };
