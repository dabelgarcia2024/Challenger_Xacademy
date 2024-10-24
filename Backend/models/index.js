const Player = require('./Player');
const Skill = require('./Skill');

// Relación: Un jugador puede tener muchas habilidades
Player.hasMany(Skill, { foreignKey: 'playerId' });
Skill.belongsTo(Player, { foreignKey: 'playerId' });

module.exports = {
  Player,
  Skill,
};
