import { User } from '../../models/initModels.js';

export const register = async (req, res) => {
  const { userName } = req.body;
  if (!userName || typeof userName !== 'string' || userName.trim() === '')
    return res.status(400).json({ error: 'UserName is required' });
  try {
    const exists = await User.findOne({ where: { userName } });
    if (exists)
      return res
        .status(400)
        .json({ error: 'UserName already exists, please try a different one.' });
    const user = await User.create({ userName });
    return res.status(201).json({ message: 'user registered, you can login now.', user });
  } catch (error) {
    console.log('error: ', error);
    return res.status(500).json({ error: error.message });
  }
};
