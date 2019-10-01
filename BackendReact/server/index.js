const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const connectDB = require('../config/db');

app.use(morgan('dev'));

app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

//Connect Database;
connectDB();

app.use(express.static(path.join(__dirname, '../public')));

app.use('/api', require('./api'));

// app.get('*', function(req, res) {
//   res.sendFile(path.join(__dirname), '../public/index.html');
// });
//too wield ,need help!! what is the difference??

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
}); // Send index.html for any other requests

app.use(function(err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

module.exports = app;
