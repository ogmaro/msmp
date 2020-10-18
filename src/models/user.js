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
        required: true,
        match: /^(?=.*\d)(?=.*[a-zA-Z])(?!.*\s).{6,}$/ //test that passowrd contains 6 or more character and must contain a number

    },
    emailAddress: {
        type: String,
        required: true,
        unique: true,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i
    },
    username:   {
        type: String,
        required: true,
        unique: true,
        match: /^([\w][\w\-_\u0020]{4,20}[\w])$/
    },
    phoneNumber: {
        type: String,
        required: true,
        match: /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/i

    },
    dateOfBirth: {
        type: String,
        required: true,
        trim: true,
        match: /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|(([1][26]|[2468][048]|[3579][26])00))))$/ig
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        match: /^(?:m|M|male|Male|f|F|female|Female)$/
    },
    Address: {
        type: String,
        match: /^^(No) [\d]+, ?[\w ]+, ?[a-z]+, ?[a-zA-Z]+\.$/i 
    }
})
module.exports = mongosse.model('User', userSchema);