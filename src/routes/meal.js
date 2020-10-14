const express = require('express')
const router = express.Router();
const errorhandler = require('./error');

router.get('/', (req, res, next) =>{
    res.status(200).json({
        msg: 'all meal here'
    })
})

router.post('/', (req, res, next) =>{
    const meal = {
        name: req.body.name,
        price: req.body.price
    }
    res.status(201).json({
        msg: 'meal added', mealName: meal.name, mealPrice: meal.price
    })
})


router.patch('/', (req, res, next) =>{
    res.status(200).json({
        msg: 'meal has been updated'
    })
});

router.delete('/', (req, res, next) =>{
    res.status(500).json({
        msg: 'meal has been deleted'
    })
});

router.get('/:mealID', (req, res, next) =>{
    const id = req.params.mealID;
    res.status(200).json({
        msg: 'a meal here', id: id
    })
})

router.get('*', errorhandler)

module.exports = router