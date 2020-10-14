const mongoose = require('mongoose')

const MONGO_URI = 'mongodb://ogmaro:Dolphin1@msmp-shard-00-00.1p2hb.gcp.mongodb.net:27017,msmp-shard-00-01.1p2hb.gcp.mongodb.net:27017,msmp-shard-00-02.1p2hb.gcp.mongodb.net:27017/local?ssl=true&replicaSet=atlas-5qtujw-shard-0&authSource=admin&retryWrites=true&w=majority'


const connect = mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log(`MongoDB connected Successful`))
    .catch(error => console.log(error.message))

module.exports = connect;