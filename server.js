const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();
// required to use .env file to hide username, password, and database name - npm install dotenv --save
require('dotenv').config();

// express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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

db.query('SELECT * FROM candidates', (err, rows) => {
  console.log(rows);
});

// default response for any other request (not found)
// place at bottom of routes to avoid overwriting a valid route
app.use((req, res) => {
  res.status(404).end();
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});