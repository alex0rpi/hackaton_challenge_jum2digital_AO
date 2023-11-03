/* import jwt from 'jsonwebtoken';
import { User } from '../models/initModels.js'; */

export const authenticate = async (req, res, next) => {
  const user = req.session.user;
  if (!user) return res.status(401).json({ error: 'Unauthorized' });

  /* const { token } = req.cookies;
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const { username } = jwt.verify(token, process.env.JWT_SECRET);
    const exists = await User.findOne({ where: { username } });
    if (!exists) return res.status(401).json({ error: 'Unauthorized' });
    req.username = username;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized' });
  } */
  next();
};
