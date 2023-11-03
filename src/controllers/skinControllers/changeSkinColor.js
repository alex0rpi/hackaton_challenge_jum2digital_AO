import { UserSkin } from '../../models/initModels.js';

export const changeSkinColor = async (req, res) => {
  const user = req.session.user;
  const { skinId, color } = req.body;
  if (!skinId || typeof skinId !== 'number')
    return res.status(400).json({ error: 'SkinId integer is required' });
  //   color validation
  if (!color || typeof color !== 'string')
    return res.status(400).json({ error: 'Color string is required' });
  const skinIsOwned = await UserSkin.findOne({
    where: { userId: user.userId, skinId: skinId },
  });
  if (!skinIsOwned) return res.status(404).json({ error: 'Skin not owned 🧐' });
  if (color === skinIsOwned.color)
    return res.status(400).json({ error: 'Color already set, choose a different one🖌️' });
  await UserSkin.update({ color }, { where: { skinId } });
  return res.status(200).json({ message: '✅Owned skin color changed 🎨' });
};
