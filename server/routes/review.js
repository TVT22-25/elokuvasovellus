const { Router } = require('express');
const { getReviews, getMovieReviews, postReview, updateReview, deleteReview } = require('../database/review.js');
const authenticateToken = require('./authentication.js');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const result = await getReviews(req.body.review_id);
    res.status(result.code).json(result.content);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});
  
router.get('/movie', async (req, res) => {
  try {
    const result = await getMovieReviews(req.body.movie_id);
    res.status(result.code).json(result.content);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});
  
router.post('/post', authenticateToken, async (req, res) => {
  try {
    const result = await postReview(req.user.user_id, req.body.movie_id, req.body.rating, req.body.comment);
    res.status(result.code).json(result.content);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});
  
router.put('/update', authenticateToken, async (req, res) => {
  try {
    const review_id = req.body.review_id;
    const updateFields = { ...req.body };
    delete updateFields.review_id; 
  
    const result = await updateReview(review_id, updateFields);
    res.status(result.code).json(result.content);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});
  
router.delete('/delete', authenticateToken, async (req, res) => {
  try {
    const result = await deleteReview(req.body.review_id);
    res.status(result.code).json(result.content);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

module.exports = router;