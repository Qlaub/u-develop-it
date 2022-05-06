const mysql = require('mysql2');
// required to use .env file to hide username, password, and database name - npm install dotenv --save
require('dotenv').config();

// connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // mysql username
    user: process.env.DB_USER,
    // mysql pass
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  },
  console.log('Connected to the election database.')
);

module.exports = db;