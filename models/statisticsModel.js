// models/statisticsModel.js

const { DataTypes } = require('sequelize');
const db = require('../config/db.config');

// Define the Statistics model
const Statistics = db.define('Statistics', {
  month: {
    type: DataTypes.STRING,
    allowNull: false
  },
  totalSaleAmount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  totalSoldItems: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  totalNotSoldItems: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});


// Sync the model with the database
Statistics.sync({ alter: true }) 
  .then(() => console.log('Statistics model synced with database'))
  .catch(err => console.error('Error syncing Statistics model:', err));

module.exports = Statistics;
