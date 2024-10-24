const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Skill = sequelize.define('Skill', {
  playerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  skillName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  value: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
});

module.exports = Skill;
