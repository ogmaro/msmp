const mongosse =  require('mongoose');
const Schema = mongosse.Schema;

const mealSchema = new Schema({
    _id: mongosse.Schema.Types.ObjectId,
    name:  {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    mealPicture: {
        type: String,
        require: true
    }
})
module.exports = mongosse.model('Meal', mealSchema);