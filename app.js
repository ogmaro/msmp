/**
 * node dependecies
 */
const express       = require('express');
// const mongoose = require('mongoose')

/**
 * project dependecies
 */
const orderRoute    = require('./src/routes/order')
const customerRoute = require('./src/routes/user')
const mealRoute     = require('./src/routes/meal')
// const MONGO_URI     = require('./config')

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', (req, res, next) => {
    console.log('Method is ',req.method)
    next()
});

/**
 * Connect MongoDB
 */
require('./db')();

app.use('/order', orderRoute)
app.use('/meal', mealRoute)
app.use('/user', customerRoute)


module.exports = app;

