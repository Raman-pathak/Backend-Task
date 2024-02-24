// Transaction model 
const transactionModel = (sequelize, DataTypes) => {
    const Transaction = sequelize.define('Transaction', {
      // transaction model fields here
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      price: DataTypes.FLOAT,
      dateOfSale: DataTypes.DATE,
      category: DataTypes.STRING,
    });
  
    return Transaction;
  };
  
  module.exports = transactionModel;
  