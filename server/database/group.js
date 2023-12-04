const { pgPool } = require('./connection.js');

const sql = {
  GET_GROUP: 'SELECT group_id, group_name, description, created FROM groups WHERE group_id=$1',
  GET_ALL_GROUPS: 'SELECT * FROM groups',
  GET_GROUP_USERS: 'SELECT users.user_id, users.username, users.email, users.created FROM users JOIN user_groups ON users.user_id = user_groups.user_id WHERE (user_groups.group_id = $1)',
  POST_GROUP: 'INSERT INTO groups (group_name, description) VALUES ($1, $2)',
  POST_USER: 'INSERT INTO user_groups (user_id, group_id) VALUES ($1, $2)',
  UPDATE_GROUP: 'UPDATE groups SET {columns} WHERE group_id=$1',
  DELETE_GROUP: 'DELETE FROM groups WHERE group_id=$1',
  DELETE_GROUP_USER: 'DELETE FROM user_groups WHERE user_id=$1 AND group_id=$2',
};

const getGroups = async (group_id) => {
  if (group_id) {
    const result = await pgPool.query(sql.GET_GROUP, [group_id]);
    return result.rowCount > 0
      ? { code: 202, content: result.rows }
      : { code: 404, content: { error: 'Group not found by group_id' } };
  }

  const result = await pgPool.query(sql.GET_ALL_GROUPS);
  return { code: 202, content: result.rows };
};

const getGroupUsers = async (group_id) => {
  const result = await pgPool.query(sql.GET_GROUP_USERS, [group_id]);
  return result.rowCount > 0
    ? { code: 202, content: result.rows }
    : { code: 404, content: { error: 'Group not found with group_id' } };
};

const postGroup = async (group_name, description) => {
  const result = await pgPool.query(sql.POST_GROUP, [group_name, description]);
  return result.rowCount > 0
    ? { code: 202, content: result.rows }
    : { code: 404, content: { error: 'Could not create group' } };
};

const postGroupUser = async (user_id, group_id) => {
  const result = await pgPool.query(sql.POST_USER, [user_id, group_id]);
  return result.rowCount > 0
    ? { code: 202, content: result.rows }
    : { code: 404, content: { error: 'Could not create group' } };
};

const updateGroup = async (group_id, updateFields) => {
  console.log(updateFields);
  const columnsToUpdate = Object.keys(updateFields);
  const updateValues = Object.values(updateFields);
  const updateColumns = columnsToUpdate.map((col, index) => `${col}=$${index + 2}`);

  const updateQuery = sql.UPDATE_GROUP.replace('{columns}', updateColumns.join(', '));

  const queryValues = [group_id, ...updateValues];

  const result = await pgPool.query(updateQuery, queryValues);
  return result.rowCount > 0
    ? { code: 202, content: result.rows }
    : { code: 404, content: { error: 'Group not found by group_id' } };
};

const deleteGroup = async (group_id) => {
  const result = await pgPool.query(sql.DELETE_GROUP, [group_id]);
  return result.rowCount > 0
    ? { code: 202, content: result.rows }
    : { code: 404, content: { error: 'Group not found by group_id' } };
};

const deleteGroupUser = async (user_id, group_id) => {
  console.log(user_id);
  console.log(group_id);
  const result = await pgPool.query(sql.DELETE_GROUP_USER, [user_id, group_id]);
  return result.rowCount > 0
    ? { code: 202, content: result.rows }
    : { code: 404, content: { error: 'user not found in group by user_id' } };
};

module.exports = { getGroups, getGroupUsers, postGroup, deleteGroup, postGroupUser, updateGroup, deleteGroupUser };
