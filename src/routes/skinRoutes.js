import express from 'express';
import {
  getSkins,
  buySkin,
  getUserSkins,
  changeSkinColor,
  deleteSkin,
  getSingleSkin,
  populate,
} from '../controllers/index.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('welcome');
});

router.get('/skins/populate', populate);

router.get('/skins/available', getSkins);

router.post('/skins/buy', buySkin);

router.get('/skins/myskins', getUserSkins);

router.put('/skins/color', changeSkinColor);

router.delete('/skins/delete/:id', deleteSkin);

router.get('/skin/getskin/:id', getSingleSkin);

export default router;
