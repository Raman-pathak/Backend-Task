const { calculateStatistics } = require('../services/statisticsService');

// Controller to handle statistics
const getStatistics = async (req, res) => {
  try {
    // Extract the month parameter from the request query
    const { month } = req.query;

    // Check if the month parameter is provided
    if (!month) {
      return res.status(400).json({ error: 'Month parameter is required' });
    }

    // Calculate statistics based on the provided month
    const statistics = await calculateStatistics(month);

    // Send the calculated statistics as a JSON response
    res.json(statistics);
  } catch (error) {
    console.error('Error fetching statistics:', error);
    res.status(500).json({ error: 'An error occurred while fetching statistics' });
  }
};

module.exports = {
  getStatistics,
};
