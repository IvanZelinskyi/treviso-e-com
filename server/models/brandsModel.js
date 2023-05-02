const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema({
  brandName: { type: String, required: true, unique: true }
},
{strictQuery: false});

module.exports = mongoose.model("brands", brandSchema);