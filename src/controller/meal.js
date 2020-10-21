const Meal = require("../models/meal");
const mongoose = require("mongoose");
const createError = require("../helpers/errorHelper");

exports.getAllMeal = (req, res, next) => {
  Meal.find()
    .select("name price mealPicture")
    .exec()
    .then((results) => {
      const response = {
        totalRegistered: results.length,
        meals: results.map((result) => {
          return {
            ID: result._id,
            name: result.name,
            price: result.price,
            mealPicture: result.mealPicture,
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
      console.log(error.message);
      res.status(500).json({
        res: " An error occur",
      });
    });
};

exports.createNewMeal = (req, res, next) => {
  //console.log(req.file)
  const meal = new Meal({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    mealPicture: req.file.path,
  });
  meal
    .save()
    .then((result) => {
      res.status(201).json({
        msg: "meal has been created",
        mealCreated: {
          ID: result._id,
          name: result.name,
          price: result.price,
          mealPicture: result.mealPicture,
          request: {
            method: "GET",
            url: "mongodb://127.0.0.1:27017/msmp_eatery/" + result._id,
          },
        },
      });
    })
    .catch((error) => {
      console.log(error.message);
      res.status(500).json({
        msg: "could not create meal",
        error: error,
      });
    });
};

exports.getMealByID = (req, res, next) => {
  const _id = req.params.mealID;
  Meal.findById({ _id: _id })
    .select("name price mealPicture")
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
          msg: "meal not found",
        });
      }
    })
    .catch(createError.InternalServerError);
};

exports.updateMealByID = (req, res, next) => {
  const _id = req.params.mealID;
  const updateDB = {};
  for (const db of req.body) {
    updateDB[db.newUpdate] = db.value;
  }
  Meal.update({ _id: _id }, { $set: updateDB })
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
      console.log(error.message);
      res.status(500).json({
        msg: "An error occured",
        error: error,
      });
    });
};

exports.deleteMealByID = (req, res, next) => {
  const _id = req.params.mealID;
  Meal.findByIdAndDelete({
    _id: _id,
  })
    .exec()
    .then((result) => {
      if (result) {
        console.log(result);
        res.status(200).json({
          msg: "Meal deleted",
          result,
        });
      } else {
        res.status(501).json({
          msg: "Meal not found me already have been deleted",
        });
      }
    })
    .catch((error) => {
      console.log(error.messageclear);
      res.status(500).json({
        msg: "an error occured",
      });
    });
};
