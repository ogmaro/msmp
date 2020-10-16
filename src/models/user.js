const mongosse =  require('mongoose');
const Schema = mongosse.Schema;

const userSchema = new Schema({
    _id: mongosse.Schema.Types.ObjectId,
    firstname:  {
        type: String,
        // required: true
    },
    lastname:   {
        type: String,
        //required: true
    },
    password: {
        type: String,
        required: true
    },
    emailAddress: {
        type: String,
        required: true,
        unique: true,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    username:   {
        type: String,
        // required: true,
        // unique: true
    },
    phoneNumber: {
        type: String,
        // required: true,
        // unique: true
    },
    dateOfBirth: {
        type: String,
        // required: true,
        // trim: true,
    },
    gender: {
        type: String,
        enum: ["male", "female"]
    },
    Address: {
        country: {type: String},
        state: { type: String},
        city: {type: String},
        streetName: {type: String},
        postalCode: {type: Number},
        dept: {type: String}
    }
})
module.exports = mongosse.model('User', userSchema);