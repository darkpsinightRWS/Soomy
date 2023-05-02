const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const packUseSchema = new Schema({
  room_id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  user_id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  purchase_id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  remaining: {
    type: Number,
    required: true,
  },
  createdAt:{
    type:Date,
    default: new Date()
  }
});

const Pack = mongoose.model("packUse", packUseSchema);

module.exports = Pack;