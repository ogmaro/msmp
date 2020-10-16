const express = require('express');
const router = express.Router();
const errorhandler = require('../../helpers/error')
const mongoose = require('mongoose')
const Meal = require('../models/meal')
const multer = require('multer')
const helper = require('../../helpers/helper')

const storage = multer.diskStorage({
    destination: (req, file, cb)=> {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb)=> {
        
        cb(null, helper.randomN0Gen(100000) + file.originalname)
    }
})
const fileFilter = (req, file, cb) =>{
    return file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ? cb(null, true) : cb(null, false);
};
const upload = multer({
    storage: storage,
    limits:{
        fileSize: 1024 *1024 * 5,},
    filer: fileFilter
})


//handle incoming get request for /meals
router.get('/', (req, res, next) => {
    Meal.find()
        .select("name price")
        .exec()
        .then(results =>{
            const response = {
                totalRegistered: results.length,
                meals: results.map( result =>{
                    return{
                        ID: result._id,
                        name: result.name,
                        price: result.price,
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
 
router.post('/', upload.single('mealPicture'),(req, res, next) => {
    console.log(req.file)
    const meal = new Meal({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    })
    meal.save()
        .then(result => {  
            res.status(201).json({
                msg: 'meal has been created', mealCreated : {
                    ID: result._id,
                    name: result.name,
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
router.get('/:mealID([a-zA-Z0-9]{10,})', (req, res, next) => {
    const _id = req.params.mealID;
    if(!Meal){
        return res.status(404).json({
            msg: 'Meal not found'
        })
    }
    Meal.findById({_id: _id})
        .select("name price")
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

router.patch('/:mealID([a-zA-Z0-9]{10,})', (req, res, next) => {
    const _id = req.params.mealID;
    const updateDB = {};
    for (const db of req.body){
        updateDB[db.newUpdate] = db.value
    };
    Meal.update({ _id: _id}, { $set: updateDB})
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

router.delete('/:mealID([a-zA-Z0-9]{10,})', (req, res, next) => {
    const _id =  req.params.mealID;
    Meal.findByIdAndDelete({
        _id: _id
    })
        .select("name, price")
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