import express from 'express';
import {
  getUsers,
  populateUsers,
  register,
  login,
  deleteUsers,
  logout,
} from '../controllers/userControllers/index.js';

const router = express.Router();

router.get('/', getUsers);
router.get('/populate', populateUsers);
router.post('/register', register);
router.post('/login', login);
router.delete('/delete', deleteUsers);
router.post('/logout', logout);

export default router;
