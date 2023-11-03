import { UserSkin } from '../../models/initModels.js';

export const deleteSkin = async (req, res) => {
  const user = req.session.user;
  const { id: skinId } = req.params;

  const skinIsOwned = await UserSkin.findOne({
    where: { userId: user.userId, skinId },
  });
  if (!skinIsOwned) return res.status(404).json({ error: 'Skin not owned 🧐' });
  await UserSkin.destroy({ where: { skinId, userId: user.userId } });
  return res.status(200).json({ message: '✅Owned skin deleted 🎆' });
};
