const Order = require("../models/order");
const Meal = require("../models/meal");
const mongoose = require("mongoose");
const createError = require("http-errors");

exports.getAllOrder = (req, res, next) => {
  Order.find()
    .select("name quantity price")
    .populate("meal", "name")
    .exec()
    .then((results) => {
      const response = {
        totalOrders: results.length,
        orders: results.map((result) => {
          return {
            ID: result._id,
            name: result.meal,
            price: result.quantity,
            request: {
              method: "GET",
              url: "mongodb://127.0.0.1:27017/msmp_eatery/" + result._id,
            },
          };
        }),
      };
      res.status(200).json({
        msg: "display all data",
        response,
      });
    })
    .catch((error) => {
      next(error);
    });
};

exports.createOrder = (req, res, next) => {
  Meal.findById(req.body.mealID)
    .then((meal) => {
      if (!meal) {
        throw createError(500, "Meal Still Available");
      }
      const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        quantity: req.body.quantity,
      });

      return order.save();
    })
    .then((result) => {
      res.status(201).json({
        msg: "order has been created",
        orderCreated: {
          ID: result._id,
          name: result.meal,
          quantity: result.quantity,
          request: {
            method: "GET",
            url: "mongodb://127.0.0.1:27017/msmp_eatery/" + result._id,
          },
        },
      });
    })
    .catch((error) => {
      next(error);
    });
};

exports.getOrderByID = (req, res, next) => {
  const _id = req.params.orderID;
  if (!Order) {
    throw createError(404, "Order not found");
  }
  Order.findById({ _id: _id })
    .select("name quantity price")
    .exec()
    .then((result) => {
      if (result) {
        res.status(200).json({
          msg: "recieved data",
          result: result,
          request: {
            method: "GET",
            url: "mongodb://127.0.0.1:27017/msmp_eatery/" + _id,
          },
        });
      } else {
        res.status(404).json({
          msg: "order not found",
        });
      }
    })
    .catch((error) => {
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid Order ID"));
        return;
      }
      next(error);
    });
};

exports.updateOrderByID = (req, res, next) => {
  const _id = req.params.orderID;
  const updateDB = {};
  for (const db of req.body) {
    updateDB[db.newUpdate] = db.value;
  }
  Order.update({ _id: _id }, { $set: updateDB })
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        msg: "updated successful",
        result,
        request: {
          method: "PATCH",
          url: "mongodb://127.0.0.1:27017/msmp_eatery/" + _id,
        },
      });
    })
    .catch((error) => {
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid Order ID"));
        return;
      }
      next(error);
    });
};

exports.deleteOrderByID = (req, res, next) => {
  const _id = req.params.orderID;
  Order.findByIdAndDelete({
    _id: _id,
  })
    .exec()
    .then((result) => {
      if (result) {
        console.log(result);
        res.status(200).json({
          msg: "Order deleted",
          result,
        });
      } else {
        res.status(501).json({
          msg: "Order not found me already have been deleted",
        });
      }
    })
    .catch((error) => {
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid Order ID"));
        return;
      }
      next(error);
    });
};
