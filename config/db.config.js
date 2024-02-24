const { Sequelize } = require('sequelize');
require('dotenv').config();
// Database configuration
const dbConfig = {
  username: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  database: process.envPASSWORD,
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
};

// Initialize Sequelize with database configuration
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  port: dbConfig.port,
  logging: false, 

});

// Test the database connection

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

// Invoke the function to test the connection
testConnection();
