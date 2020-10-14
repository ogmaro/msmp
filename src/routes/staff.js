const express = require('express')
const router = express.Router();
const errorhandler = require('../../helpers/error')

router.get('/', (req, res, next) => {
    res.status(200).json({
        msg: 'list of all staff'
    })
})

router.post('/', (req, res, next) => {
    res.status(201).json({
        msg: 'new staff added'
    })
})

router.get('/:staffID([a-zA-Z]{2,})', (req, res, next) => {
    res.status(200).json({
        msg: 'staff found',
        id: req.params.staffID
    })
})
router.patch('/', (req, res, next) => {
    res.status(200).json({
        msg: 'staff info updated'
    })
})

router.delete('/', (req, res, next) => {
    res.status(200).json({
        msg: 'Staff deleted'
    })
})
router.get('*', errorhandler)


module.exports = router;