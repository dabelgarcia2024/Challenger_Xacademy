const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Player = sequelize.define('Player', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  position: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  club: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nationality: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rating: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  version: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = Player;
