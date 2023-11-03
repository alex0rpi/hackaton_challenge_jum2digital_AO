import { UserSkin, Skin } from '../../models/initModels.js';

export const buySkin = async (req, res) => {
  try {
    const { skinId } = req.body;
    if (!skinId || typeof skinId !== 'number')
      return res.status(400).json({ error: 'SkinId integer is required' });
    const user = req.session.user;
    const skinExists = await Skin.findOne({ where: { id: skinId } });
    if (!skinExists) return res.status(404).json({ error: 'Skin does not exist' });
    await UserSkin.create({ userId: user.userId, skinId });
    res.status(204).json({ message: 'Skin purchased :)' });
  } catch (error) {
    console.log('error:', error);
    res.status(500).json({ error: error.message });
  }
};
