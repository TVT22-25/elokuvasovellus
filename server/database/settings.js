const { pgPool } = require('./connection.js');

const sql = {
  GET_ALL_USER_SETTINGS: 'SELECT * FROM user_settings',
  GET_USER_SETTINGS: 'SELECT * FROM user_settings WHERE (user_id = $1)',
  CREATE_USER_SETTINGS: 'INSERT INTO user_settings (user_id, show_movies, show_news, show_reviews, show_posts) VALUES ($1, $2, $3, $4, $5)',
  UPDATE_USER_SETTINGS: 'UPDATE user_settings SET {columns} WHERE user_id=$1',
  DELETE_USER_SETTINGS: 'DELETE FROM user_settings WHERE user_id=$1'
};

const getUserSettings = async(user_id) => {
  if (user_id){
    const result = await pgPool.query(sql.GET_USER_SETTINGS, [user_id]);
    return result.rowCount > 0
      ? { code: 202, content: result.rows }
      : { code: 404, content: { error: 'Settings not found with user_id' } };
    }

    const result = await pgPool.query(sql.GET_ALL_USER_SETTINGS);
    return { code: 202, content: result.rows };  
};

const createUserSettings = async (user_id) => {
  const result = await pgPool.query(sql.CREATE_USER_SETTINGS, [user_id, true, true, true, true]);
  return result.rowCount > 0
    ? { code: 202, content: result.rows }
    : { code: 404, content: { error: 'Could not create user_settings' } };
};

const updateUserSettings = async (user_id, show_movies, show_news, show_reviews, show_posts) => {
    const result = await pgPool.query(sql.UPDATE_USER_SETTINGS, [user_id, show_movies, show_news, show_reviews, show_posts]);
    return result.rowCount > 0
      ? { code: 202, content: result.rows }
      : { code: 404, content: { error: 'Could not update user_settings' } };
};

const deleteUserSettings = async (user_id) => {
  const result = await pgPool.query(sql.DELETE_USER_SETTINGS, [user_id]);
  return result.rowCount > 0
    ? { code: 202, content: result.rows }
    : { code: 404, content: { error: 'user_settings not found by user_id' } };
};

module.exports = { getUserSettings, createUserSettings, updateUserSettings, deleteUserSettings };