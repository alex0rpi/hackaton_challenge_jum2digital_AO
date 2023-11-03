import { User } from '../../models/initModels.js';

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    if (users.length === 0) return res.json({ message: 'No users found' });
    return res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
