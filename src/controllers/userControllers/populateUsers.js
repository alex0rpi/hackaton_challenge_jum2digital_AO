import { readUsers } from '../../utils/readData.js';
import { User } from '../../models/initModels.js';

export const populateUsers = async (req, res) => {
  try {
    const existingUsers = await User.findAll();
    const userSamples = readUsers();
    if (!existingUsers.length > 0) await User.bulkCreate(userSamples);
    return res.json({ message: 'Database has user data' });
  } catch (error) {
    console.log('error: ', error);
    return res.json({ message: error.message });
  }
};
