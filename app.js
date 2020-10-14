/**
 * node dependecies
 */
const express = require('express');
const mongoose = require('mongoose')

/**
 * project dependecies
 */
const orderRoute = require('./src/routes/order')
const customerRoute = require('./src/routes/customer')
const mealRoute = require('./src/routes/meal')
const staffRoute = require('./src/routes/staff')
const MONGO_URI   =   require('./config')

const app = express();

app.use('/', (req, res, next) => {
    console.log('Method is ',req.method)
    next()
});

/**
 * Connect MongoDB
 */
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log(`MongoDB connected Successful`))
    .catch(error => console.log(error.message))

app.use('/order', orderRoute)
app.use('/meal', mealRoute)
app.use('/customer', customerRoute)
app.use('/admin', staffRoute)


module.exports = app;

