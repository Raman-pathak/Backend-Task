const axios = require('axios');
const { Transaction } = require('../models');

// Service to handle transactions
const initializeDatabase = async () => {
  try {
    // Fetch data from third-party API
    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    const data = response.data;

    // Initialize database with seed data
    await Transaction.bulkCreate(data);
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};

module.exports = {
  initializeDatabase,
};
