const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Expenditure = sequelize.define('Expenditure', {
  assetType: { type: DataTypes.STRING, allowNull: false },
  assetName: { type: DataTypes.STRING, allowNull: false },
  baseId: { type: DataTypes.INTEGER, allowNull: false },
  quantity: { type: DataTypes.INTEGER, allowNull: false },
  reason: { type: DataTypes.STRING, allowNull: true },
  expendedDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

module.exports = Expenditure;
