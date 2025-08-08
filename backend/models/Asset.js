const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Asset = sequelize.define('Asset', {
  assetType: { type: DataTypes.STRING, allowNull: false },
  assetName: { type: DataTypes.STRING, allowNull: false },
  baseId: { type: DataTypes.INTEGER, allowNull: false },
  quantity: { type: DataTypes.INTEGER, defaultValue: 0 }
});
module.exports = Asset;
