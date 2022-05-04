const express = require('express');
const mysql = require('mysql2');
const inputCheck = require('./utils/inputCheck');

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

// get all candidates
app.get('/api/candidates', (req, res) => {
  const sql = `SELECT * FROM candidates`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.messsage });
      return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

// get a single candidate
app.get('/api/candidate/:id', (req, res) => {
  const sql = `SELECT * FROM candidates WHERE id=?`;
  const params = [req.params.id];

  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: row
    });
  });
});

app.delete('/api/candidate/:id', (req, res) => {
  const sql = `DELETE FROM candidates WHERE id=?`;
  const params = [req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    } else if (!result.affectedRows) {
      res.json({
        message: 'Candidate not found'
      });
    } else {
      res.json({
        message: 'deleted',
        changes: result.affectedRows,
        id: req.params.id
      });
    }
  });
});

app.post('/api/candidate', ({ body }, res) => {
  const errors = inputCheck(body, 'first_name', 'last_name', 'industry_connected');
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

  const sql = `INSERT INTO candidates (first_name, last_name, industry_connected)
    VALUES (?, ?, ?)`;
  const params = [body.first_name, body.last_name, body.industry_connected];

  db.query(sql, params, (err, results) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: body
    });
  });
});

// create a candidate
// const sql = `
//   INSERT INTO candidates (id, first_name, last_name, industry_connected)
//   VALUES (?, ?, ?, ?)`;
// const params = [1, 'Ronald', 'Firbank', 1];

// db.query(sql, params, (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(result);
// });

// default response for any other request (not found)
// place at bottom of routes to avoid overwriting a valid route
app.use((req, res) => {
  res.status(404).end();
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});