import fs from 'fs';

export const readSkins = () => {
  try {
    const skins = fs.readFileSync('./src/data/skins.json', 'utf8');
    return skins;
  } catch (err) {
    throw err;
  }
};
