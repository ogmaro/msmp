/**
 * node dependecies
 */
const express = require('express');
require('dotenv').config({ path: __dirname + '/.env' });

/**
 * project dependecies
 */
const orderRoute = require('./src/routes/order');
const customerRoute = require('./src/routes/user');
const mealRoute = require('./src/routes/meal');
const createError = require('http-errors');

const app = express();
app.use(express.static('uploads'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', (req, res, next) => {
  console.log('Method is ', req.method);
  next();
});

/**
 * Connect MongoDB
 */
require('./src/helpers/db')();

app.use('/order', orderRoute);
app.use('/meal', mealRoute);
app.use('/user', customerRoute);

app.use('*', (req, res, next) => {
  next(createError(404, 'Not Found'));
});

app.use((error, req, res, next) => {
  res.status(error.status || 404).json({
    msg: error.message,
  });
});

module.exports = app;
