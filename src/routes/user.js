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

router.get("/:userID([a-zA-Z0-9]{10,})", UserController.getUserByID);

router.patch("/:userID([a-zA-Z0-9]{10,})", UserController.updateUserByID);

router.delete("/:userID([a-zA-Z0-9]{10,})", UserController.deleteUserByID);

router.get("*", createError.NotFound);

module.exports = router;
