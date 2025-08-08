const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Base = sequelize.define('Base', {
  name: { type: DataTypes.STRING, allowNull: false },
  location: { type: DataTypes.STRING, allowNull: false }
});
module.exports = Base;

