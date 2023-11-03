import { User } from '../../models/initModels.js';

export const login = async (req, res) => {
  const { userName } = req.body;
  if (!userName || typeof userName !== 'string' || userName.trim() === '')
    return res.status(400).json({ error: 'UserName is required' });
  try {
    const existingUser = await User.findOne(
      { where: { userName } },
      { attributes: ['userId', 'userName'] }
    );
    if (!existingUser) return res.status(400).json({ error: 'User not registered' });
    // Convert the Sequelize instance to a plain JavaScript object
    const user = existingUser.get({ plain: true });
    req.session.user = user;
    return res.status(201).json({ message: 'user logged in', user });
  } catch (error) {
    console.log('error: ', error);
    return res.status(500).json({ error: error.message });
  }
};
