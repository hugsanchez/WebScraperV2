const { Sequelize, DataTypes, Model } = require('sequelize');
const db = require('../db');

class Line extends Model{}


Line.init({
  line: {
    type: DataTypes.TEXT
  }
},{
  sequelize: db,
  modelName: 'line'
});

module.exports = Line;