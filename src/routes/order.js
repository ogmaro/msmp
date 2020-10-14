const express = require('express');
const router = express.Router();
const errorHandler = require('../../helpers/error')

//handle incoming get request for /orders
router.get('/', (req, res, next) => {
    res.status(200).json({
        msg: 'Order recieved'
    })
})
router.post('/', (req, res, next) => {
    res.status(201).json({
        msg: 'order has been created'
    })
});
router.get('/:orderID', (req, res, next) => {
    const id = req.params.orderID;
    if (id === 'special') {
        res.status(200).json({
            msg: 'in the order route', id: id
        })
    } else {
        res.status(200).json({
            msg: 'in the order route', id: id
        })
    }
});

router.patch('/', (req, res, next) => {
    res.status(200).json({
        msg: 'order has been updated'
    })
});

router.delete('/', (req, res, next) => {
    res.status(500).json({
        msg: 'order has been deleted'
    })
});


router.get('*', errorHandler)

module.exports = router;