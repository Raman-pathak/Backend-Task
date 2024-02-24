const { Transaction } = require('../models/statisticsModel');

// Service to handle statistics
const calculateStatistics = async (month) => {
  try {
    // Get transactions for the specified month
    const transactions = await Transaction.findAll({
      where: {
        date_of_sale: {
          [Sequelize.Op.gte]: new Date(`${month}-01`),
          [Sequelize.Op.lt]: new Date(`${month}-01T00:00:00Z`).setUTCMonth(new Date(`${month}-01`).getUTCMonth() + 1),
        },
      },
    });

    // Calculate statistics based on transactions
    let totalSales = 0;
    let averagePrice = 0;
    let highestPrice = 0;
    let lowestPrice = Number.MAX_VALUE;

    transactions.forEach(transaction => {
      totalSales += transaction.price;
      if (transaction.price > highestPrice) {
        highestPrice = transaction.price;
      }
      if (transaction.price < lowestPrice) {
        lowestPrice = transaction.price;
      }
    });

    if (transactions.length > 0) {
      averagePrice = totalSales / transactions.length;
    }

    return {
      totalSales,
      averagePrice,
      highestPrice,
      lowestPrice,
    };
  } catch (error) {
    console.error('Error calculating statistics:', error);
    throw error;
  }
};

module.exports = {
  calculateStatistics,
};
