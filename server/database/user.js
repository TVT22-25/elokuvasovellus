const { pgPool } = require('./connection.js');

const sql = {
  GET_USER: 'SELECT user_id, username, email, created FROM users WHERE user_id=$1',
  GET_ALL_USERS: 'SELECT user_id, username, email, created FROM users',
  GET_USER_GROUPS: 'SELECT groups.* FROM groups JOIN user_groups ON groups.group_id = user_groups.user_id WHERE (user_groups.user_id = $1)',
  REGISTER: 'INSERT INTO users (username, email, password) VALUES ($1,$2,$3)',
  LOGIN: 'SELECT user_id, password FROM users WHERE username=$1',
  UPDATE_USER: 'UPDATE users SET {columns} WHERE user_id=$1',
  REMOVE_USER: 'DELETE FROM users WHERE user_id=$1',
};

const getUsers = async(user_id) => {
  if (user_id) {
    const result = await pgPool.query(sql.GET_USER, [user_id]);
    return result.rowCount > 0
      ? { code: 202, content: result.rows[0] }
      : { code: 404, content: { error: 'User not found by user_id' } };
  }

  const result = await pgPool.query(sql.GET_ALL_USERS);
  return { code: 202, content: result.rows };
};

const getUserGroups = async (user_id) => {
  const result = await pgPool.query(sql.GET_USER_GROUPS, [user_id]);
  return result.rowCount > 0
    ? { code: 202, content: result.rows[0] }
    : { code: 404, content: { error: 'User not found with user_id' } };
};

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
};

const updateUser = async (userId, updateFields) => {
  console.log(updateFields);
  const columnsToUpdate = Object.keys(updateFields);
  const updateValues = Object.values(updateFields);
  const updateColumns = columnsToUpdate.map((col, index) => `${col}=$${index + 2}`);

  const updateQuery = sql.UPDATE_USER.replace('{columns}', updateColumns.join(', '));

  const queryValues = [userId, ...updateValues];
  console.log(queryValues);

  const result = await pgPool.query(updateQuery, queryValues);
  return result.rowCount > 0
    ? { code: 202, content: result.rows[0] }
    : { code: 404, content: { error: 'user not found by user_id' } };
};

const removeUser = async (user_id) => {
  const result = await pgPool.query(sql.REMOVE_USER, [user_id]);
  return result.rowCount > 0
    ? { code: 202, content: result.rows[0] }
    : { code: 404, content: { error: 'user not found by user_id' } };
};

module.exports = { getUsers, getUserGroups, register, login, updateUser, removeUser };
