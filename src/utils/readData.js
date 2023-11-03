import fs from 'fs';

export const readSkins = () => {
  try {
    const skins = JSON.parse(fs.readFileSync('./src/data/skins.json', 'utf8'));
    // JSON.parse converts the JSON string into a JS object
    return skins;
  } catch (err) {
    throw err;
  }
};

export const readUsers = () => {
  try {
    const users = JSON.parse(fs.readFileSync('./src/data/users.json', 'utf8'));
    return users;
  } catch (error) {
    throw error;
  }
};
