const { Router } = require('express');
const { getGroups, getGroupUsers, postGroup, deleteGroup, postGroupUser, updateGroup, deleteGroupUser } = require('../database/group.js');
const authenticateToken = require('./authentication.js');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const result = await getGroups(req.query.user_id);
    res.status(result.code).json(result.content);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});
  
router.get('/users', async (req, res) => {
  try {
    const result = await getGroupUsers(req.query.group_id);
    res.status(result.code).json(result.content);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});
  
router.post('/register', authenticateToken, async (req, res) => {
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
  
router.post('/postuser', authenticateToken, async (req, res) => {
  try {
    const result = await postGroupUser(req.user.user_id, req.body.group_id);
    res.status(result.code).json(result.content);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});
  
router.put('/update', authenticateToken, async (req, res) => {
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
  
router.delete('/delete', authenticateToken, async (req, res) => {
  try {
    const result = await deleteGroup(req.body.group_id);
    res.status(result.code).json(result.content);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});
  
router.delete('/users/delete', authenticateToken, async (req, res) => {
  try {
    const result = await deleteGroupUser(req.user.user_id, req.body.group_id);
    res.status(result.code).json(result.content);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

module.exports = router;