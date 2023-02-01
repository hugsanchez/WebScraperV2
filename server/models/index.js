const Character = require('./Character');
const Line = require('./Line');

Character.hasMany(Line);
Line.belongsTo(Character);


module.exports = {
  models: {
    Character,
    Line
  }
};