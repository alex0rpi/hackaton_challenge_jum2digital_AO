import { Skin } from '../../models/initModels.js';

export const getSingleSkin = async (req, res) => {
  const { id: skinId } = req.params;
  const skin = await Skin.findOne({ where: { id: skinId } });
  if (!skin) return res.status(404).json({ error: 'Skin not found 🧐' });
  return res.status(200).json({ message: 'There it is: ', skin });
};
