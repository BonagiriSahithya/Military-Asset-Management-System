const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Purchase = sequelize.define('Purchase', {
  assetType: { type: DataTypes.STRING, allowNull: false },
  assetName: { type: DataTypes.STRING, allowNull: false },
  baseId: { type: DataTypes.INTEGER, allowNull: false },
  quantity: { type: DataTypes.INTEGER, allowNull: false },
  purchaseDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

module.exports = Purchase;

