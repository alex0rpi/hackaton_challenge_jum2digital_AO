import { UserSkin } from '../../models/initModels.js';

export const changeSkinColor = async (req, res) => {
  const user = req.session.user;
  const { skinId, color } = req.body;
  //   color validation
  const skinIsOwned = await UserSkin.findOne({
    where: { userId: user.userId, id: skinId },
  });
  if (!skinIsOwned) return res.status(404).json({ error: 'Skin not owned 🧐' });
  await UserSkin.update({ color }, { where: { id: skinId } });
};
