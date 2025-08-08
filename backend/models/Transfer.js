const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Transfer = sequelize.define('Transfer', {
  assetType: { type: DataTypes.STRING, allowNull: false },
  assetName: { type: DataTypes.STRING, allowNull: false },
  fromBaseId: { type: DataTypes.INTEGER, allowNull: false },
  toBaseId: { type: DataTypes.INTEGER, allowNull: false },
  quantity: { type: DataTypes.INTEGER, allowNull: false },
  transferDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});
module.exports = Transfer;

