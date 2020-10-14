const mongoose = require('mongoose')

const MONGO_URI = 'mongodb://127.0.0.1:27017/msmp_eatery';

const connect = mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log(`MongoDB connected Successful`))
    .catch(error => console.log(error.message))

module.exports = connect; 