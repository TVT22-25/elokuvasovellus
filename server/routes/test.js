const { Router } = require('express');
const { getUsers } = require('../database/user.js');
const { register, getPw } = require('../database/auth.js')

const router = Router();

router.get('/users', async (req, res) => {
  try {
    const result = await getUsers(req.query.user_id);
    res.status(result.code).json(result.content);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.post('/register', async (req, res) => {
  const { username, email, password } = req.query;

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
})

router.get('/login', async (req, res) => {
  try {
    const result = await getPw(req.query.user_id);
    res.status(result.code).json(result.content);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
})

module.exports = router;
