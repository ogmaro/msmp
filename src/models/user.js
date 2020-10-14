const mongosse =  require('mongoose');
const Schema = mongosse.Schema;

const customerSchema = new Schema({
    firstname:  {
        type: String,
        required: true
    },
    lastname:   {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    emailAddress: {
        type: [String],
        required: true,
        unique: true
    },
    username:   {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    dateOfBirth: {
        type: Date,
        required: true,
        trim: true,
    },
    gender: {
        type: String,
        enum: ["male", "female"]
    },
    role: {
        type: Boolean
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