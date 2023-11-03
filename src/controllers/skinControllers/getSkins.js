import { Skin } from '../../models/initModels.js';

export const getSkins = async (req, res) => {
  try {
    const skins = await Skin.findAll();
    if (!skins || skins.length === 0)
      return res.json({ message: 'No skins to show for now.' });
    return res.json(skins);
  } catch (error) {}
};
