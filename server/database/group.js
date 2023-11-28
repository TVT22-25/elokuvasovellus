const { pgPool } = require('./connection.js');

const sql = {
  GET_GROUP: 'SELECT group_id, group_name, desc, created FROM groups WHERE group_id=$1',
  GET_ALL_GROUPS: 'SELECT * FROM groups',
  GET_GROUP_USERS: 'SELECT users.* FROM users JOIN user_groups ON users.user_id = user_groups.user_id WHERE (user_groups.group_id = $1)',
  POST_GROUP: 'INSERT INTO groups (group_name, desc) VALUES ($1, $2)',
};

async function getGroups(group_id) {
  if (group_id) {
    const result = await pgPool.query(sql.GET_GROUP, [group_id]);
    return result.rowCount > 0
      ? { code: 202, content: result.rows[0] }
      : { code: 404, content: { error: 'Group not found by group_id' } };
  }

  const result = await pgPool.query(sql.GET_ALL_GROUPS);
  return { code: 202, content: result.rows };
}

async function getGroupUsers(group_id) {
  const result = await pgPool.query(sql.GET_GROUP_USERS, [group_id]);
  return result.rowCount > 0
    ? { code: 202, content: result.rows[0] }
    : { code: 404, content: { error: 'Group not found with group_id' } };
}

async function createGroup(group_name, desc) {
  const result = await pgPool.query(sql.POST_GROUP, [group_name, desc]);
  return result.rowCount > 0
    ? { code: 202, content: result.rows[0] }
    : { code: 404, content: { error: 'Could not create group' } };
}

module.exports = { getGroups, getGroupUsers, createGroup };
