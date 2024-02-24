
const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const Transaction = require('../models/transactionModel');

// API endpoint for generating a bar chart
router.get('/barchart', async (req, res) => {
  const { month } = req.query;

  try {
    // Fetch transactions for the selected month
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

    // Define price ranges
    const priceRanges = [
      { range: '0 - 100', count: 0 },
      { range: '101 - 200', count: 0 },
      { range: '201 - 300', count: 0 },
      { range: '301 - 400', count: 0 },
      { range: '401 - 500', count: 0 },
      { range: '501 - 600', count: 0 },
      { range: '601 - 700', count: 0 },
      { range: '701 - 800', count: 0 },
      { range: '801 - 900', count: 0 },
      { range: '901 - above', count: 0 }
    ];

    // Calculate the number of items in each price range
    transactions.forEach(transaction => {
      const price = transaction.price;
      if (price <= 100) {
        priceRanges[0].count++;
      } else if (price <= 200) {
        priceRanges[1].count++;
      } else if (price <= 300) {
        priceRanges[2].count++;
      } else if (price <= 400) {
        priceRanges[3].count++;
      } else if (price <= 500) {
        priceRanges[4].count++;
      } else if (price <= 600) {
        priceRanges[5].count++;
      } else if (price <= 700) {
        priceRanges[6].count++;
      } else if (price <= 800) {
        priceRanges[7].count++;
      } else if (price <= 900) {
        priceRanges[8].count++;
      } else {
        priceRanges[9].count++;
      }
    });

    res.json(priceRanges);
  } catch (error) {
    console.error('Error generating bar chart:', error);
    res.status(500).json({ error: 'Error generating bar chart' });
  }
});

module.exports = router;