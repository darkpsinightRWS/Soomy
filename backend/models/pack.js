const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const packSchema = new Schema({
  num_uses: {
    type: Number,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  createdAt:{
    type:Date,
    default: new Date()
  }
});

const Pack = mongoose.model("pack", packSchema);

module.exports = Pack;