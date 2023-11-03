import { readSkins } from '../../utils/readData.js';
import { Skin } from '../../models/initModels.js';

export const populateSkins = async (req, res) => {
  try {
    const existingSkins = await Skin.findAll();
    const skinsSamples = readSkins();
    if (!existingSkins.length > 0) await Skin.bulkCreate(skinsSamples);
    return res.json({ message: 'Database has skin data' });
  } catch (error) {
    console.log('error: ', error);
    return res.json({ message: error.message });
  }
};
