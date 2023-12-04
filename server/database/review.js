const { pgPool } = require('./connection.js');

const sql = {
  GET_REVIEWS: 'SELECT * FROM REVIEWS',
  GET_USER_REVIEWS: 'SELECT reviews.* FROM reviews JOIN users on reviews.user_id = users.user_id WHERE (users.user_id = $1)',
  POST_REVIEW: 'INSERT INTO reviews (user_id, movie_id, rating, comment) VALUES ($1, $2, $3, $4)',
};

const getReviews = async (user_id) => {
  if (user_id){
    const result = await pgPool.query(sql.GET_USER_REVIEWS, [user_id]);
    return result.rowCount > 0
      ? { code: 202, content: result.rows[0] }
      : { code: 404, content: { error: 'Review not found with user_id' } };
  }
  
  const result = await pgPool.query(sql.GET_REVIEWS);
  return { code: 202, content: result.rows }; 
};

module.exports = { getReviews };