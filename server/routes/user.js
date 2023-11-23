import { Router } from 'express';
import { getUsers } from '../database/user.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const result = await getUsers(req.query.user_id);
    res.status(result.code).json(result.content);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

export { router };
