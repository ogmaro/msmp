const mongoose = require('mongoose')
const MONGO_URL = 'mongodb://127.0.0.1:27017/msmp_eatery'

module.exports = () => mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(() => console.log(`MongoDB connected Successful`))
    .catch(error => console.log(error.message))
    mongoose.Promise = global.Promise;

    mongoose.connection.on('connected', () => {
        console.log('Mongoose connected to db...');
      });
    
      mongoose.connection.on('error', err => {
        console.log(err.message);
      });
    
      mongoose.connection.on('disconnected', () => {
        console.log('Mongoose connection is disconnected...');
      });
    
      process.on('SIGINT', () => {
        mongoose.connection.close(() => {
          console.log(
            'Mongoose connection is disconnected due to app termination...'
          );
          process.exit(0);
        });
      });
  