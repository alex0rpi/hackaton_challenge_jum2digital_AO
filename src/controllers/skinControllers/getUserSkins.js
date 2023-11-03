import { User, UserSkin } from '../../models/initModels.js';

export const getUserSkins = async (req, res) => {
  const user = req.session.user;
  const userSkins = await UserSkin.findAll({
    where: { userId: user.userId },
    include: { model: User, attributes: ['username'] },
  });
  const skins = userSkins.map((skin) => skin.get({ plain: true }));
  res.status(200).json({ skins });
};
