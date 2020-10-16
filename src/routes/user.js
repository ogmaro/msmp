const express = require('express');
const router = express.Router();
const errorhandler = require('../../helpers/error')
const mongoose = require('mongoose')
const User = require('../models/user')

//handle incoming get request for /users
router.get('/', (req, res, next) => {
    User.find()
        .select("firstname lastname password emailAddress username phoneNumber gender Address")
        .exec()
        .then(results =>{
            const response = {
                totalRegistered: results.length,
                users: results.map( result =>{
                    return{
                        ID: `${result._id}`,
                        name: `${result.lastname} ${result.firstname}`,
                        email: `${result.emailAddress}`,
                        username: `${result.username}`,
                        phone: `${result.phoneNumber}`,
                        gender: `${result.gender}`,
                        Address: `${res.Address}`,
                        request: {
                            method: 'GET',
                            url: 'mongodb://127.0.0.1:27017/msmp_eatery/' +result._id
                        }
                    }
                })
            }            
            res.status(200).json({
                msg: "display all data", response
            })
        })
        .catch(error =>{
            console.log(error.message)
            res.status(500).json({
                res: " An error occur"
            })
        })
});

router.post('/', (req, res, next) => {
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password,
        emailAddress: req.body.emailAddress,
        username: req.body.username,
        phoneNumber: req.body.phoneNumber,
        dateOfBirth: req.body.dateOfBirth,
        gender: req.body.gender,
        Address: req.body.Address

    })
    user.save()
        .then(result => {  
            res.status(201).json({
                msg: 'user has been created', userCreated : {
                    ID: result._id,
                    name: result.lastname,
                    email: result.emailAddress,
                    username: result.username,
                    phone: result.phoneNumber,
                    gender: result.gender,
                    Address: result.Address,
                    request: {
                        method: 'GET',
                        url: 'mongodb://127.0.0.1:27017/msmp_eatery/' +result._id
                 }   
                }
            })                      
        })
        .catch((error)=>{
            console.log(error.message)
            res.status(500).json({
                msg: "could not create user", error: error
            })
        })
    });
router.get('/:userID([a-zA-Z0-9]{10,})', (req, res, next) => {
    const _id = req.params.userID;
    if(!User){
        return res.status(404).json({
            msg: 'User not found'
        })
    }
    User.findById({_id: _id})
        .select("firstname lastname password emailAddress username phoneNumber gender Address")
        .exec()
        .then(result => {
            if(result){
                res.status(200).json({
                msg: "recieved data",
                result: result,
                request: {
                    method: 'GET',
                    url: 'mongodb://127.0.0.1:27017/msmp_eatery/' +_id}  
                     
            })} else {
                res.status(404).json({
                    msg: 'user not found'
                })
            }  
        })
        .catch(error => {
            res.status(500).json({
                msg: "error occur"
            })
            console.log(error.message)
        })
});

router.patch('/:userID([a-zA-Z0-9]{10,})', (req, res, next) => {
    const _id = req.params.userID;
    const updateDB = {};
    for (const db of req.body){
        updateDB[db.newUpdate] = db.value
    };
    User.update({ _id: _id}, { $set: updateDB})
    .exec()
    .then( result => {
        console.log(result)
        res.status(200).json({
            msg: "updated successful",
            result,
            request: {
                method: 'PATCH',
                url: 'mongodb://127.0.0.1:27017/msmp_eatery/' +_id}  
        })
    })
    .catch( error => {
        console.log(error.message)
        res.status(500).json({
            msg: "An error occured", error: error
        })
    })

});

router.delete('/:userID([a-zA-Z0-9]{10,})', (req, res, next) => {
    const _id =  req.params.userID;
    User.findByIdAndDelete({
        _id: _id
    })
        .exec()
        .then(result => {
            console.log(result)
            res.status(200).json({
                msg: "user deleted", result
            });
        })
        .catch( error =>{
            console.log(error.messageclear)
            res.status(500).json({
                msg: "an error occured",
            })
        })
});

router.get('*', errorhandler)

module.exports = router;