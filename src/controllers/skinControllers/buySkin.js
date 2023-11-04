import { UserSkin, Skin } from '../../models/initModels.js';

export const buySkin = async (req, res) => {
  try {
    const { skinId } = req.body;
    if (!skinId || typeof skinId !== 'number')
      return res.status(400).json({ error: 'SkinId integer is required' });
    const user = req.session.user;
    const existingSkin = await Skin.findOne({ where: { id: skinId } });
    if (!existingSkin) return res.status(404).json({ error: 'Skin does not exist' });
    const skin = existingSkin.get({ plain: true });
    const userHasSkin = await UserSkin.findOne({
      where: { userId: user.userId, name: skin.name },
    });
    if (userHasSkin) return res.status(400).json({ error: 'Skin already owned' });
    await UserSkin.create({
      name: skin.name,
      price: skin.price,
      color: skin.color,
      userId: user.userId,
      skinId,
    });
    return res
      .status(200)
      .json({ message: `User ${user.userName} purchased skin ${existingSkin.name} :)` });
  } catch (error) {
    console.log('error:', error);
    res.status(500).json({ error: error.message });
  }
};
