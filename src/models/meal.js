const mongosse =  require('mongoose');
const Schema = mongosse.Schema;

const mealSchema = new Schema({
    _id: mongosse.Schema.Types.ObjectId,
    name:  {
        type: mongosse.Schema.Types.ObjectId
        // required: true
    },
    quantity:   {
        type: String,
        //required: true
    },
    price: {
        type: String,
        //required: true
    }
})
module.exports = mongosse.model('Meal', mealSchema);