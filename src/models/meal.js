const mongosse = require('mongoose');
const Schema = mongosse.Schema;

const mealSchema = new Schema({
  _id: mongosse.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
    match: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
  },
  price: {
    type: Number,
    required: true,
    match: /^\d+(,\d{1,2})?$/,
  },
  mealPicture: {
    type: String,
    require: true,
  },
});
module.exports = mongosse.model('Meal', mealSchema);
