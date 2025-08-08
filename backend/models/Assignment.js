const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Assignment = sequelize.define('Assignment', {
  assetType: { type: DataTypes.STRING, allowNull: false },
  assetName: { type: DataTypes.STRING, allowNull: false },
  baseId: { type: DataTypes.INTEGER, allowNull: false },
  assignedTo: { type: DataTypes.STRING, allowNull: false },
  quantity: { type: DataTypes.INTEGER, allowNull: false },
  assignmentDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

module.exports = Assignment;


