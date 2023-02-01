const { Sequelize, DataTypes, Model } = require('sequelize');
const db = require('../db');

class Character extends Model{}

Character.init({
  name: {
    type: DataTypes.STRING
  }
},{
  sequelize: db,
  modelName: 'character'
});

module.exports = Character;