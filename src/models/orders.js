const mongosse =  require('mongoose');
const Schema = mongosse.Schema;

const orderSchema = new Schema({
    _id: mongosse.Schema.Types.ObjectId,
    name:  {
        type: mongosse.Schema.Types.ObjectId, ref: 'Meal'
    },
    quantity: {
        type: Number,
        default: 1
    }
})
module.exports = mongosse.model('Order', orderSchema);