const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const packPurchaseSchema = new Schema({
  pack_id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  user_id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  transaction_id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  createdAt:{
    type:Date,
    default: new Date()
  }
});

const Pack = mongoose.model("packPurchase", packPurchaseSchema);

module.exports = Pack;