const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const secretKey = 'secret-key';
const router = express.Router();
const { getUsers, getUserGroups, getUserReviews, postUser, loginUser, updateUser, deleteUser } = require('../database/user.js');
const { getGroups, getGroupUsers, postGroup, deleteGroup, postGroupUser, updateGroup, deleteGroupUser } = require('../database/group.js');
const { getReviews, getMovieReviews, postReview, updateReview, deleteReview } = require('../database/review.js');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    req.user = user;
    next();
  });
};

router.get('/users', async (req, res) => {
  try {
    const result = await getUsers(req.body.user_id);
    res.status(result.code).json(result.content);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.get('/users/groups', async (req, res) => {
  try {
    const result = await getUserGroups(req.body.user_id);
    res.status(result.code).json(result.content);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.get('/users/reviews', async (req, res) => {
  try {
    const result = await getUserReviews(req.body.user_id);
    res.status(result.code).json(result.content);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.post('/users/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Missing parameters' });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const result = await postUser(username, email, hashedPassword);

    res.status(result.code).json(result.content);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.get('/users/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await loginUser(username);
    const user = result.content[0];
    const match = await bcrypt.compare(password, user.password);

    if (match) {
      const token = jwt.sign({ username: username, user_id: user.user_id}, secretKey, { expiresIn: '24h' });
    
      // eslint-disable-next-line no-unused-vars
      const { password: _, ...userWithoutPassword } = user;
    
      res.status(result.code).json({ token: token, username: username, ...userWithoutPassword });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.put('/users/update', authenticateToken, async (req, res) => {
  try {
    const user_id = req.body.user_id;
    const updateFields = { ...req.body };
    delete updateFields.user_id; 

    const result = await updateUser(user_id, updateFields);
    res.status(result.code).json(result.content);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.delete('/users/delete', authenticateToken, async (req, res) => {
  try {
    const result = await deleteUser(req.body.user_id);
    res.status(result.code).json(result.content);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.get('/groups', async (req, res) => {
  try {
    const result = await getGroups(req.body.user_id);
    res.status(result.code).json(result.content);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});
  
router.get('/groups/users', async (req, res) => {
  try {
    const result = await getGroupUsers(req.body.group_id);
    res.status(result.code).json(result.content);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});
  
router.post('/groups/register', async (req, res) => {
  const { group_name, description  } = req.body;
  
  try {
    if (!group_name || !description) {
      return res.status(400).json({ error: 'Missing parameters' });
    }
  
    const result = await postGroup(group_name, description);
  
    res.status(result.code).json(result.content);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});
  
router.post('/groups/postuser', async (req, res) => {
  try {
    const result = await postGroupUser(req.body.user_id, req.body.group_id);
    res.status(result.code).json(result.content);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});
  
router.put('/groups/update', async (req, res) => {
  try {
    const group_id = req.body.group_id;
    const updateFields = { ...req.body };
    delete updateFields.group_id; 
  
    const result = await updateGroup(group_id, updateFields);
    res.status(result.code).json(result.content);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});
  
router.delete('/groups/delete', async (req, res) => {
  try {
    const result = await deleteGroup(req.body.group_id);
    res.status(result.code).json(result.content);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});
  
router.delete('/groups/users/delete', async (req, res) => {
  try {
    const result = await deleteGroupUser(req.body.user_id, req.body.group_id);
    res.status(result.code).json(result.content);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.get('/reviews', async (req, res) => {
  try {
    const result = await getReviews(req.body.review_id);
    res.status(result.code).json(result.content);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});
  
router.get('/reviews/movie', async (req, res) => {
  try {
    const result = await getMovieReviews(req.body.movie_id);
    res.status(result.code).json(result.content);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});
  
router.post('/reviews/post', async (req, res) => {
  try {
    const result = await postReview(req.body.user_id, req.body.movie_id, req.body.rating, req.body.comment);
    res.status(result.code).json(result.content);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});
  
router.put('/reviews/update', async (req, res) => {
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
  
router.delete('/reviews/delete', async (req, res) => {
  try {
    const result = await deleteReview(req.body.review_id);
    res.status(result.code).json(result.content);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

module.exports = router;
