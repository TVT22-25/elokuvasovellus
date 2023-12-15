const { Router } = require('express');
const { getUserSettings, createUserSettings, updateUserSettings, deleteUserSettings } = require('../database/settings.js');
const authenticateToken = require('./authentication.js');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const result = await getUserSettings(req.query.user_id);
    res.status(result.code).json(result.content);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});
  
router.post('/create', authenticateToken, async (req, res) => {
  try {
    const result = await createUserSettings(req.user.user_id);
    res.status(result.code).json(result.content);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});
  
router.post('/update', authenticateToken, async (req, res) => {
  try {
    const result = await updateUserSettings(req.user.user_id, req.body.show_movies, req.body.show_news, req.body.show_reviews, req.body.show_posts);
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