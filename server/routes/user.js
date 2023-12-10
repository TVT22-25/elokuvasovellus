const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getUsers, getUserGroups, getUserReviews, postUser, loginUser, updateUser, deleteUser } = require('../database/user.js');
const authenticateToken = require('./authentication.js');
const saltRounds = 10;
const secretKey = 'secret-key';
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await getUsers(req.body.user_id);
    res.status(result.code).json(result.content);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.get('/groups', async (req, res) => {
  try {
    const result = await getUserGroups(req.body.user_id);
    res.status(result.code).json(result.content);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.get('/reviews', async (req, res) => {
  try {
    const result = await getUserReviews(req.body.user_id);
    res.status(result.code).json(result.content);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.post('/register', async (req, res) => {
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

router.get('/login', async (req, res) => {
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

router.put('/update', authenticateToken, async (req, res) => {
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

router.delete('/delete', authenticateToken, async (req, res) => {
  try {
    const result = await deleteUser(req.body.user_id);
    res.status(result.code).json(result.content);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

module.exports = router;
