/**
 * @description   : It is use to establish the connection between the database and server
 * @package       : express, dotenv
 * @file          : server.js
 * @author        : Gautam Biswal <gautam971997@gmail.com>
*/
const express = require('express');
require('dotenv').config();
require('./config/dbConfig');

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the BookStore.' });
});

app.listen(process.env.PORT, () => {
  console.log('Server is listening on port 3000');
});

