const { Router } = require('express');
const { getUsers, getUserGroups, postUser, loginUser, updateUser, deleteUser } = require('../database/user.js');
const { getGroups, getGroupUsers, postGroup, deleteGroup, postGroupUser, updateGroup, deleteGroupUser } = require('../database/group.js');
const { getReviews } = require('../database/review.js');

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

router.post('/users/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Missing parameters' });
    }

    const result = await postUser(username, email, password);

    res.status(result.code).json(result.content);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.get('/users/login', async (req, res) => {
  try {
    const result = await loginUser(req.body.username);
    res.status(result.code).json(result.content);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.put('/users/update', async (req, res) => {
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

router.delete('/users/delete', async (req, res) => {
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
    const result = await getReviews(req.body.user_id);
    res.status(result.code).json(result.content);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

module.exports = router;
