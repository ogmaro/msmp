/**
 * node dependecies
 */
const express       = require('express');
// const mongoose = require('mongoose')

/**
 * project dependecies
 */
const orderRoute    = require('./src/routes/order')
const customerRoute = require('./src/routes/customer')
const mealRoute     = require('./src/routes/meal')
const staffRoute    = require('./src/routes/staff')
const MONGO_URI     = require('./config')

const app = express();
app.use(express.json())

app.use('/', (req, res, next) => {
    console.log('Method is ',req.method)
    next()
});

/**
 * Connect MongoDB
 */
MONGO_URI

app.use('/order', orderRoute)
app.use('/meal', mealRoute)
app.use('/customer', customerRoute)
app.use('/admin', staffRoute)


module.exports = app;

