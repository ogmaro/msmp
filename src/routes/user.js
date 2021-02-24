const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const UserController = require('../controller/user');

//handle incoming get request for /users
router.get('/', UserController.getAllUsers);

router.post('/signup', UserController.createNewUser);
router.post('/login', UserController.logUserIn);

router.get('/:userID', UserController.getUserByID);

router.patch('/:userID', UserController.updateUserByID);

router.delete('/:userID', UserController.deleteUserByID);

router.get('*', createError.NotFound);

module.exports = router;
