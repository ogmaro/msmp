const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/user");
const jwt = require("../helpers/jwt_helper.js");
const createError = require("http-errors");
const UserController = require("../controller/user");

//handle incoming get request for /users
router.get("/", UserController.getAllUsers);

router.post("/signup", UserController.createNewUser);
router.post("/login", UserController.logUserIn);

router.get("/:userID", UserController.getUserByID);

router.patch("/:userID", UserController.updateUserByID);

router.delete("/:userID", UserController.deleteUserByID);

router.get("*", createError.NotFound);

module.exports = router;
