const { Router } = require('express');
const { getUsers, getUserGroups, register, login, updateUser, removeUser } = require('../database/user.js');
const { getReviews } = require('../database/review.js');
//const { getGroups, getGroupUsers, createGroup } = require('../database/group.js');

const router = Router();

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

router.get('/reviews', async (req, res) => {
  try {
    const result = await getReviews(req.body.user_id);
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

    const result = await register(username, email, password);

    res.status(result.code).json(result.content);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.get('/login', async (req, res) => {
  try {
    const result = await login(req.body.username);
    res.status(result.code).json(result.content);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.put('/users/update', async (req, res) => {
  try {
    const userId = req.body.user_id;
    const updateFields = { ...req.body };
    delete updateFields.user_id; 

    const result = await updateUser(userId, updateFields);
    res.status(result.code).json(result.content);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.delete('/users/remove', async (req, res) => {
  try {
    const result = await removeUser(req.body.user_id);
    res.status(result.code).json(result.content);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

module.exports = router;
