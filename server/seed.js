const db = require('./db');
const fs = require('fs');
const path = require('path');
const csvjson = require('csvjson');

const { models: { Character, Line } } = require('./models/index');



const syncAndSeed = async() => {
  await db.sync({ force: true });

  const char = await Character.create({
    name: 'Rolf'
  });
  
  const linesToJson = fs.readFileSync(path.join(__dirname, '../RolfsLines_edTestData.csv'), {encoding: 'utf-8'});
  let csvData = csvjson.toObject(linesToJson);

  await Promise.all(
    csvData.map((objData) => {
      let obj = {};
      obj['line'] = objData.line;
      obj['characterId'] = 1;
      Line.create(obj);
    })
  );
};

module.exports = {
  syncAndSeed,
  db
};