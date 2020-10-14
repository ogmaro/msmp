const express = require('express')
const router = express.Router();


const app = express();

app.use((req, res, next) =>{
    const error = new Error("route not found")
error.status = 404;
    next(error)
})

app.use((error, req, res, next) =>{
    res.status(error.status || 500);
    res.json({
        error:{
            msg: error.message
        }
    })
})



module.exports = app;