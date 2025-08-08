const sequelize = require('../config/db');
const User = require('./User');
const Base = require('./Base');
const Asset = require('./Asset');
const Purchase = require('./Purchase');
const Transfer = require('./Transfer');
const Assignment = require('./Assignment');
const Expenditure = require('./Expenditure');

// Associations (add as needed)
User.belongsTo(Base, { foreignKey: 'baseId' });
Asset.belongsTo(Base, { foreignKey: 'baseId' });

module.exports = { sequelize, User, Base, Asset, Purchase, Transfer, Assignment, Expenditure };

