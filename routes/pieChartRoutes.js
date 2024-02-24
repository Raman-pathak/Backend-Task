
const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const Transaction = require('../models/transactionModel');

// API endpoint for generating data for a pie chart
router.get('/piechart', async (req, res) => {
  const { month } = req.query;

  try {
  
    const transactions = await Transaction.findAll({
      where: {
        dateOfSale: {
          [Op.and]: [
            { [Op.gte]: `${month}-01` },
            { [Op.lt]: `${month}-31` }
          ]
        }
      }
    });

    // Calculate the number of items from each category
    const categories = {};
    transactions.forEach(transaction => {
      const category = transaction.category;
      if (categories[category]) {
        categories[category]++;
      } else {
        categories[category] = 1;
      }
    });

    // Format the response as required for a pie chart
    const pieChartData = [];
    for (const category in categories) {
      pieChartData.push({ category, count: categories[category] });
    }

    res.json(pieChartData);
  } catch (error) {
    console.error('Error generating pie chart data:', error);
    res.status(500).json({ error: 'Error generating pie chart data' });
  }
});

module.exports = router;
