const express = require('express');
const router = express.Router();
const errorhandler = require('../../helpers/error')

//handle incoming get request for /customers
router.get('/', (req, res, next) => {
    res.status(200).json({
        msg: 'in the customer route'
    })
});

router.post('/', (req, res, next) => {
    res.status(201).json({
        msg: 'customer has been created'
    })
});
router.get('/:customerID', (req, res, next) => {
    const id = req.params.customerID;
    if (id === 'special') {
        res.status(200).json({
            msg: 'in the customer route', id: id
        })
    } else {
        res.status(200).json({
            msg: 'in the customer route', id: id
        })
    }
});

router.patch('/', (req, res, next) => {
    res.status(200).json({
        msg: 'customer has been updated'
    })
});

router.delete('/', (req, res, next) => {
    res.status(500).json({
        msg: 'customer has been deleted'
    })
});

router.get('*', errorhandler)

module.exports = router;