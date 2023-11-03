import { readSkins, readUsers } from '../utils/readData.js';
import { User, Skin } from '../models/initModels.js';

export const populate = async (req, res) => {
  try {
    const existingUsers = await User.findAll();
    const existingSkins = await Skin.findAll();
    const userSamples = readUsers();
    const skinsSamples = readSkins();
    if (!existingUsers.length > 0) await User.bulkCreate(userSamples);
    if (!existingSkins.length > 0) await Skin.bulkCreate(skinsSamples);
    return res.json({ message: 'Database has data' });
  } catch (error) {
    console.log('error: ', error);
    return res.json({ message: error.message });
  }
};
