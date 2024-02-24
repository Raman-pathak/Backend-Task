const { Transaction } = require('../models/transactionModel');

// Controller to handle transactions
const listTransactions = async (req, res) => {
  try {
    // Extract search query parameters from req
    const { search, page, pageSize } = req.query;

    // Define options for querying transactions
    const options = {
      attributes: ['title', 'description', 'price', 'date_of_sale'], 
      where: {}, // Define the search criteria
      order: [['date_of_sale', 'DESC']], 
    };

    // Add search criteria if provided
    if (search) {
      options.where = {
        [Op.or]: [
          { title: { [Op.iLike]: `%${search}%` } },
          { description: { [Op.iLike]: `%${search}%` } },
        ],
      };
    }

    // Add pagination if provided
    if (page && pageSize) {
      const offset = (page - 1) * pageSize;
      options.offset = offset;
      options.limit = parseInt(pageSize, 10);
    }

    // Fetch transactions based on options
    const transactions = await Transaction.findAll(options);

    // Send response with fetched transactions
    res.json({ transactions });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'An error occurred while fetching transactions.' });
  }
};

module.exports = {
  listTransactions,
};
