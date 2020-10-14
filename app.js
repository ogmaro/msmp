const express = require('express');
const app = express();
const orderRoute = require('./src/routes/order')
const customerRoute = require('./src/routes/customer')

app.use('/', (req, res, next) => {
    console.log('Method is ',req.method)
    next()
});

app.use('/order', orderRoute)
app.use('/meal', mealRoute)
app.use('/customer', customerRoute)


module.exports = app;

