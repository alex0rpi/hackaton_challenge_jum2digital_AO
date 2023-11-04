import { User } from '../../models/initModels.js';
export const deleteUser = async (req, res) => {
  const { userId } = req.session.user;
  const user = await User.findOne({ where: { userId } });
  if (!user) return res.status(404).json({ message: 'user not found' });
  await User.destroy({ where: { userId } });
  req.session.destroy((err) => {
    if (err) return next(err);
  });
  res.status(200).json({ message: `user ${user.userName} was deleted` });
};
