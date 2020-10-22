const User = require("../models/user");
const mongoose = require("mongoose");
const createError = require("http-errors");
const bcrypt = require("bcrypt");

exports.createNewUser = (req, res, next) => {
  User.find({ emailAddress: req.body.emailAddress })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        throw createError(403, "User may already exist");
      } else {
        bcrypt.hash(req.body.password, 10, (error, hash) => {
          if (error) {
            throw createError(500, "Authetication failed");
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              firstname: req.body.firstname,
              lastname: req.body.lastname,
              password: hash,
              emailAddress: req.body.emailAddress,
              username: req.body.username,
              phoneNumber: req.body.phoneNumber,
              dateOfBirth: req.body.dateOfBirth,
              gender: req.body.gender,
              Address: req.body.Address,
            });

            user
              .save()
              .then((result) => {
                res.status(201).json({
                  msg: "user has been created",
                  userCreated: {
                    ID: result._id,
                    name: result.lastname,
                    email: result.emailAddress,
                    password: result.password,
                    username: result.username,
                    phone: result.phoneNumber,
                    gender: result.gender,
                    Address: result.Address,
                    request: {
                      method: "GET",
                      url:
                        "mongodb://127.0.0.1:27017/msmp_eatery/" + result._id,
                    },
                  },
                });
              })
              .catch((error) => {
                if (error.name === "ValidationError") {
                  throw next(createError(422, error.message));
                }
                next(error);
              });
          }
        });
      }
    })
    .catch((error) => {
      next(error);
    });
};

exports.getAllUsers = (req, res, next) => {
  User.find()
    .select(
      "firstname lastname password emailAddress username phoneNumber gender Address"
    )
    .exec()
    .then((results) => {
      const response = {
        totalRegistered: results.length,
        users: results.map((result) => {
          return {
            ID: `${result._id}`,
            name: `${result.lastname} ${result.firstname}`,
            email: `${result.emailAddress}`,
            username: `${result.username}`,
            phone: `${result.phoneNumber}`,
            gender: `${result.gender}`,
            Address: `${res.Address}`,
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
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid User ID"));
        return;
      }
      next(error);
    });
};

exports.logUserIn = (req, res, next) => {
  User.find({ emailAddress: req.body.email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({
          msg: "Authetication failed",
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (error, result) => {
        if (error) {
          return res.status(401).json({
            msg: "Authetication failed",
          });
        }
        if (result) {
          const token = jwt.signInToken(user[0].emailAddress);
          return res.status(200).json({
            msg: "Authetication Successful",
            token: token,
          });
        }
        res.status(401).json({
          msg: "Authetication failed",
        });
      });
    })
    .catch(
      res.status(500).json({
        msg: "Bad request",
      })
    );
};

exports.getUserByID = (req, res, next) => {
  const _id = req.params.userID;
  if (!User) {
    throw createError(500, "User already exsist");
  }
  User.findById({ _id: _id })
    .select(
      "firstname lastname password emailAddress username phoneNumber gender Address"
    )
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
          msg: "user not found",
        });
      }
    })
    .catch((error) => {
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid User ID"));
        return;
      }
      next(error);
    });
};

exports.updateUserByID = (req, res, next) => {
  const _id = req.params.userID;
  const updateDB = {};
  for (const db of req.body) {
    updateDB[db.newUpdate] = db.value;
  }
  User.update({ _id: _id }, { $set: updateDB })
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
        next(createError(400, "Invalid User ID"));
        return;
      }
      next(error);
    });
};

exports.deleteUserByID = (req, res, next) => {
  const _id = req.params.userID;
  User.findByIdAndDelete({
    _id: _id,
  })
    .exec()
    .then((result) => {
      if (result) {
        console.log(result);
        res.status(200).json({
          msg: "User deleted",
          result,
        });
      } else {
        throw createError(404, "User not found");
      }
    })
    .catch((error) => {
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid User ID"));
        return;
      }
      next(error);
    });
};
