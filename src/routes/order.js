const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const jwt = require('../helpers/jwt_helper');
const OrderController = require('../controller/order');

//handle incoming get request for /orders
router.get('/', jwt.verifyToken, OrderController.getAllOrder);

router.post('/', jwt.verifyToken, OrderController.createOrder);

router.get('/:orderID', jwt.verifyToken, OrderController.getOrderByID);

router.patch('/:orderID', jwt.verifyToken, OrderController.updateOrderByID);

router.delete('/:orderID', jwt.verifyToken, OrderController.deleteOrderByID);

router.get('*', createError.NotFound);

module.exports = router;
