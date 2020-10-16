const express = require('express');
const router = express.Router();
const errorhandler = require('../../helpers/error')
const mongoose = require('mongoose')
const meal = require('../models/meal')

//handle incoming get request for /meals
router.get('/', (req, res, next) => {
    meal.find()
        .select("name quantity price")
        .exec()
        .then(results =>{
            const response = {
                totalRegistered: results.length,
                meals: results.map( result =>{
                    return{
                        ID: result._id,
                        name: result.name,
                        price: result.quantity,
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
    const meal = new meal({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        quantity: req.body.quantity,
        price: req.body.price

    })
    meal.save()
        .then(result => {  
            res.status(201).json({
                msg: 'meal has been created', mealCreated : {
                    ID: result._id,
                    name: result.quantity,
                    price: result.price,
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
                msg: "could not create meal", error: error
            })
        })
    });
router.get('/:mealID', (req, res, next) => {
    const _id = req.params.mealID;
    meal.findById({_id: _id})
        .select("name quantity price")
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
                    msg: 'meal not found'
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

router.patch('/:mealID', (req, res, next) => {
    const _id = req.params.mealID;
    const updateDB = {};
    for (const db of req.body){
        updateDB[db.newUpdate] = db.value
    };
    meal.update({ _id: _id}, { $set: updateDB})
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

router.delete('/:mealID', (req, res, next) => {
    const _id =  req.params.mealID;
    meal.findByIdAndDelete({
        _id: _id
    })
        .exec()
        .then(result => {
            console.log(result)
            res.status(200).json({
                msg: "meal deleted", result
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