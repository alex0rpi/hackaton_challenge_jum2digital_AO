import express from 'express';
import {
  getSkins,
  buySkin,
  getUserSkins,
  changeSkinColor,
  deleteSkin,
  getSingleSkin,
  populateSkins,
} from '../controllers/skinControllers/index.js';
import { authenticate } from '../middleware/authenticate.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('welcome');
});

router.get('/skins/available', getSkins);

router.get('/skins/populate', populateSkins);

router.post('/skins/buy', authenticate, buySkin);

router.get('/skins/myskins', authenticate, getUserSkins);

router.put('/skins/color', authenticate, changeSkinColor);

router.delete('/skins/delete/:id', authenticate, deleteSkin);

router.get('/skin/getskin/:id', getSingleSkin);

export default router;
