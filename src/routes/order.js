const express = require('express');
const router = express.Router();
const errorhandler = require('../../helpers/error')
const mongoose = require('mongoose')
const Order = require('../models/orders')
const Meal = require('../models/meal')

//handle incoming get request for /orders
router.get('/', (req, res, next) => {
    Order.find()
        .select("name quantity price")
        // .populate('meal')
        .exec()
        .then(results =>{
            const response = {
                totalOrders: results.length,
                orders: results.map( result =>{
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
    Meal.findById(req.body.mealID)
        .then(meal =>{
            if(!meal) {
                return res.status(404).json({
                  msg: "Meal not found"
                });
              }
    const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        quantity: req.body.quantity

    })

    return order
            .save()
    }).then(result => {  
        res.status(201).json({
            msg: 'order has been created', orderCreated : {
                ID: result._id,
                name: result.meal,
                quantity: result.quantity,
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
            msg: "could not create order", error: error
        })
    })
})
router.get('/:orderID([a-zA-Z0-9]{10,})', (req, res, next) => {
    const _id = req.params.orderID;
    if(!Order){
        return res.status(404).json({
            msg: 'Order not found'
        })
    }
    Order.findById({_id: _id})
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
                    msg: 'order not found'
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

router.patch('/:orderID([a-zA-Z0-9]{10,})', (req, res, next) => {
    const _id = req.params.orderID;
    const updateDB = {};
    for (const db of req.body){
        updateDB[db.newUpdate] = db.value
    };
    Order.update({ _id: _id}, { $set: updateDB})
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

router.delete('/:orderID([a-zA-Z0-9]{10,})', (req, res, next) => {
    const _id =  req.params.orderID;
    Order.findByIdAndDelete({
        _id: _id
    })
        .select("name, quantity, price")
        .exec()
        .then(result => {
            console.log(result)
            res.status(200).json({
                msg: "order deleted", result
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