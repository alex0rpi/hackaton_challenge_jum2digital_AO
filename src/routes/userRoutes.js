import express from 'express';
import {
  getUsers,
  populateUsers,
  register,
  login,
  deleteUser,
  logout,
} from '../controllers/userControllers/index.js';
import { authenticate } from '../middleware/authenticate.js';

const router = express.Router();

router.get('/', getUsers);
router.get('/populate', populateUsers);
router.post('/register', register);
router.post('/login', login);
router.delete('/delete', authenticate, deleteUser);
router.post('/logout', logout);

export default router;
