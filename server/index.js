const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const connectDB = require('../config/db');

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Connect Database;
connectDB();

app.use(express.static(path.join(__dirname, '../public')));

app.use('/api', require('./api'));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname), '../public/index.html');
});

app.use(function(err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

module.exports = app;
