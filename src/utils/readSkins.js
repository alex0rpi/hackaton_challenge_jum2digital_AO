import fs from 'fs';

const readSkins = () => {
  try {
    // Read skins.json file and produce an array variable with skin objects in it
    const skins = JSON.parse(fs.readFileSync('./src/data/skins.json', 'utf8'));
    // JSON.parse converts the JSON string into a JS object
    // skins is an array of objects
    console.log('skins: ', skins);
    return skins;
  } catch (err) {
    throw err;
  }
};

export default readSkins;
