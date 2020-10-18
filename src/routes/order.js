const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Order = require("../models/orders");
const Meal = require("../models/meal");
const createError = require("http-errors");
const jwt = require("../helpers/jwt_helper");
const OrderController = require("../controller/order");

//handle incoming get request for /orders
router.get("/", jwt.verifyToken, OrderController.getAllOrder);

router.post("/", jwt.verifyToken, OrderController.createOrder);

router.get(
  "/:orderID([a-zA-Z0-9]{10,})",
  jwt.verifyToken,
  OrderController.getOrderByID
);

router.patch(
  "/:orderID([a-zA-Z0-9]{10,})",
  jwt.verifyToken,
  OrderController.updateOrderByID
);

router.delete(
  "/:orderID([a-zA-Z0-9]{10,})",
  jwt.verifyToken,
  OrderController.deleteOrderByID
);

router.get("*", createError.NotFound);

module.exports = router;
