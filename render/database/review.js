const { pgPool } = require('./connection.js');

const sql = {
  GET_REVIEW: 'SELECT * FROM reviews WHERE review_id=$1',
  GET_ALL_REVIEWS: 'SELECT * FROM reviews',
  GET_USER_REVIEWS: 'SELECT reviews.* FROM reviews JOIN users on reviews.user_id = users.user_id WHERE (users.user_id = $1)',
  POST_REVIEW: 'INSERT INTO reviews (user_id, movie_id, rating, comment) VALUES ($1, $2, $3, $4)',
  GET_MOVIE_REVIEWS: 'SELECT * FROM REVIEWS WHERE movie_id=$1',
  UPDATE_REVIEW: 'UPDATE reviews SET {columns} WHERE review_id=$1',
  DELETE_REVIEW: 'DELETE FROM reviews WHERE review_id=$1',
};

const getReviews = async (review_id) => {
  if (review_id){
    const result = await pgPool.query(sql.GET_REVIEW, [review_id]);
    return result.rowCount > 0
      ? { code: 202, content: result.rows }
      : { code: 404, content: { error: 'Review not found with review_id' } };
  }
  
  const result = await pgPool.query(sql.GET_ALL_REVIEWS);
  return { code: 202, content: result.rows }; 
};

const postReview = async (user_id, movie_id, rating, comment) => {
  const result = await pgPool.query(sql.POST_REVIEW, [user_id, movie_id, rating, comment]);
  return result.rowCount > 0
    ? { code: 202, content: result.rows }
    : { code: 404, content: { error: 'Could not create review' } };
};

const getMovieReviews = async (movie_id) => {
  const result = await pgPool.query(sql.GET_MOVIE_REVIEWS, [movie_id]);
  return result.rowCount > 0
    ? { code: 202, content: result.rows }
    : { code: 404, content: { error: 'Review not found with movie_id' } };
};

const updateReview = async (review_id, updateFields) => {
  
  const columnsToUpdate = Object.keys(updateFields);
  const updateValues = Object.values(updateFields);
  const updateColumns = columnsToUpdate.map((col, index) => `${col}=$${index + 2}`);

  const updateQuery = sql.UPDATE_REVIEW.replace('{columns}', updateColumns.join(', '));

  const queryValues = [review_id, ...updateValues];

  const result = await pgPool.query(updateQuery, queryValues);
  return result.rowCount > 0
    ? { code: 202, content: result.rows }
    : { code: 404, content: { error: 'user not found by review_id' } };
};

const deleteReview = async (review_id) => {
  const result = await pgPool.query(sql.DELETE_REVIEW, [review_id]);
  return result.rowCount > 0
    ? { code: 202, content: result.rows }
    : { code: 404, content: { error: 'user not found by user_id' } };
};

module.exports = { getReviews, getMovieReviews, postReview, updateReview, deleteReview };