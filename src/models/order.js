const mongosse = require("mongoose");
const Schema = mongosse.Schema;

const orderSchema = new Schema({
  _id: mongosse.Schema.Types.ObjectId,
  meal: {
    type: mongosse.Schema.Types.ObjectId,
    ref: "Meal",
    require: true,
  },
  quantity: {
    type: Number,
    default: 1,
    match: /^0*(\d{1,9})$/,
  },
});
module.exports = mongosse.model("Order", orderSchema);
