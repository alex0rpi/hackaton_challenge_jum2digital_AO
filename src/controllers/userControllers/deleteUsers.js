import { User } from '../../models/initModels.js';
export const deleteUsers = async (req, res) => {
  await User.destroy({ where: {} });
  res.status(200).json({ message: 'users deleted' });
};
