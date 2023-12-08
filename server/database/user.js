const { pgPool } = require('./connection.js');

const sql = {
  GET_USER: 'SELECT user_id, username, email, created FROM users WHERE user_id=$1',
  GET_ALL_USERS: 'SELECT user_id, username, email, created FROM users',
  GET_USER_GROUPS: 'SELECT groups.* FROM groups JOIN user_groups ON groups.group_id = user_groups.group_id WHERE (user_groups.user_id = $1)',
  GET_USER_REVIEWS: 'SELECT reviews.* FROM reviews JOIN users on reviews.user_id = users.user_id WHERE (users.user_id = $1)',
  POST_USER: 'INSERT INTO users (username, email, password) VALUES ($1,$2,$3)',
  LOGIN_USER: 'SELECT user_id, password FROM users WHERE username=$1',
  UPDATE_USER: 'UPDATE users SET {columns} WHERE user_id=$1',
  DELETE_USER: 'DELETE FROM users WHERE user_id=$1',
};

const getUsers = async(user_id) => {
  if (user_id) {
    const result = await pgPool.query(sql.GET_USER, [user_id]);
    return result.rowCount > 0
      ? { code: 202, content: result.rows }
      : { code: 404, content: { error: 'User not found by user_id' } };
  }

  const result = await pgPool.query(sql.GET_ALL_USERS);
  return { code: 202, content: result.rows };
};

const getUserGroups = async (user_id) => {
  const result = await pgPool.query(sql.GET_USER_GROUPS, [user_id]);
  return result.rowCount > 0
    ? { code: 202, content: result.rows }
    : { code: 404, content: { error: 'User not found with user_id' } };
};

const getUserReviews = async (user_id) => {
  const result = await pgPool.query(sql.GET_USER_REVIEWS, [user_id]);
  return result.rowCount > 0
    ? { code: 202, content: result.rows }
    : { code: 404, content: { error: 'Review not found with user_id' } };
};

const postUser = async (username, email, password) => {
  const result = await pgPool.query(sql.POST_USER, [username, email, password]);
  return result.rowCount > 0
    ? { code: 202, content: result.rows }
    : { code: 404, content: { error: 'Could not create user' } };
};

const loginUser = async (username) => {
  const result = await pgPool.query(sql.LOGIN_USER, [username]);
  return result.rowCount > 0
    ? { code: 202, content: result.rows }
    : { code: 404, content: { error: 'User not found by username' } };
};

const updateUser = async (user_id, updateFields) => {
  const columnsToUpdate = Object.keys(updateFields);
  const updateValues = Object.values(updateFields);
  const updateColumns = columnsToUpdate.map((col, index) => `${col}=$${index + 2}`);

  const updateQuery = sql.UPDATE_USER.replace('{columns}', updateColumns.join(', '));

  const queryValues = [user_id, ...updateValues];

  const result = await pgPool.query(updateQuery, queryValues);
  return result.rowCount > 0
    ? { code: 202, content: result.rows }
    : { code: 404, content: { error: 'user not found by user_id' } };
};

const deleteUser = async (user_id) => {
  const result = await pgPool.query(sql.DELETE_USER, [user_id]);
  return result.rowCount > 0
    ? { code: 202, content: result.rows }
    : { code: 404, content: { error: 'user not found by user_id' } };
};

module.exports = { getUsers, getUserGroups, getUserReviews, postUser, loginUser, updateUser, deleteUser };
